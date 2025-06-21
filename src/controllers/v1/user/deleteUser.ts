// Node Modules
import { v2 as cloudinary } from 'cloudinary';

// Custom Modules
import { logger } from '@/lib/winston';

// Models
import User from '@/models/user';
import Blog from '@/models/blog';

// Types
import type { Request, Response } from 'express';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;
  try {
    const blogs = await Blog.find({ author: userId })
      .select('banner.publicId')
      .lean()
      .exec();
    const publicIds = blogs.map(({ banner }) => banner.publicId);

    await cloudinary.api.delete_resources(publicIds);

    await Blog.deleteMany({ author: userId });

    logger.info('multiple blogs deleted', { userId, blogs });

    logger.info('Multiple blogs banner images deleted from Cloudinary', {
      publicIds,
    });

    await User.deleteOne({ _id: userId }).select('-__v').exec();

    logger.info('User account has been deleted', { userId });

    res.sendStatus(204); // No Content
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });

    logger.error('Error while deleting a user', error);
  }
};
export default deleteUser;
