import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxlength: [50, 'Email cannot exceed 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // Do not return password in queries
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxlength: [30, 'First name cannot exceed 30 characters'],
    },
    lastName: {
      type: String,
      maxlength: [30, 'Last name cannot exceed 30 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxlength: [100, 'Website URL cannot exceed 100 characters'],
      },
      facebook: {
        type: String,
        maxlength: [100, 'Facebook URL cannot exceed 100 characters'],
      },
      instagram: {
        type: String,
        maxlength: [100, 'Instagram URL cannot exceed 100 characters'],
      },
      linkedin: {
        type: String,
        maxlength: [100, 'LinkedIn URL cannot exceed 100 characters'],
      },
      x: {
        type: String,
        maxlength: [100, 'X URL cannot exceed 100 characters'],
      },
      youtube: {
        type: String,
        maxlength: [100, 'YouTube URL cannot exceed 100 characters'],
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  // Hash the password before saving
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default model<IUser>('User', userSchema);
