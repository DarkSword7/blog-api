// Custom Modules
import { logger } from '@/lib/winston';

// Models
import Blog from '@/models/blog';
import Comment from '@/models/comment';

// Types
import type { Request, Response } from 'express';

const getCommentsByBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId).select('_id').lean().exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    const allComments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!allComments) {
      res.status(404).json({
        code: 'NotFound',
        message: 'No comments found for this blog',
      });
      return;
    }

    res.status(200).json({
      comments: allComments,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal server error',
      error: error,
    });

    logger.error('Error retrieving comments', error);
  }
};

export default getCommentsByBlog;
