// Node Modules
import bcrypt from 'bcrypt';

// Custom Modules
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';
import { genUsername } from '@/utils';

// Models
import User from '@/models/user';
import Token from '@/models/token';

// Types
import type { Request, Response } from 'express';
import type { IUser } from '@/models/user';

type UserData = Pick<IUser, 'email' | 'password' | 'role'>;

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body as UserData;

  if (role === 'admin' && !config.WHITELIST_ADMINS_EMAIL.includes(email)) {
    res.status(403).json({
      code: 'AuthorizationError',
      message: 'You are not allowed to register as an admin',
    });

    logger.warn(`Unauthorized admin registration attempt by ${email}`);
    return;
  }

  try {
    const username = genUsername();

    const newUser = await User.create({
      username, // Assign the generated username
      email,
      password,
      role,
    });

    // Generate access token and refresh token for the new user
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    // Store the refresh token in the database
    await Token.create({
      userId: newUser._id,
      token: refreshToken,
    });
    logger.info('Refresh token created for the user', {
      userId: newUser._id,
      token: refreshToken,
    });

    // Set the refresh token as a cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
    });

    res.status(200).json({
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
    });
    logger.info('User registered successfully', {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });
    logger.error('Error during user registration', error);
  }
};

export default register;
