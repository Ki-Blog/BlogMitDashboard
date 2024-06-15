import { createComment, getPostComments, likeComment } from '../controllers/comment.controller.js';
import Comment from '../models/comment.model.js';
import { errorHandler } from '../utils/error.js';

jest.mock('../models/comment.model.js');

describe('Comment Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

 
  it('should create a new comment', async () => {
   
    const req = {
      body: {
        content: 'Test comment',
        postId: 'postId',
        userId: 'user123',
      },
      user: {
        id: 'user123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

   
    const saveMock = jest.fn();
    Comment.mockImplementation(() => ({
      save: saveMock,
    }));

    await createComment(req, res, next);

    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

 
  it('should get comments for a post', async () => {
    
    const req = {
      params: {
        postId: 'postId', 
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    const mockComments = [{ content: 'Test comment', postId: 'postId' }];

  
    Comment.find.mockResolvedValue(mockComments);

    await getPostComments(req, res, next);

    expect(Comment.find).toHaveBeenCalledWith({ postId: 'postId' });
    // expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(mockComments); 
    // expect(next).not.toHaveBeenCalled(); 

    expect(Comment.find).toHaveBeenCalledTimes(1);
    // expect(res.status).toHaveBeenCalledTimes(1);
    // expect(res.json).toHaveBeenCalledTimes(1);
  });


  it('should like a comment', async () => {
    
    const req = {
      params: {
        commentId: 'commentId',
      },
      user: {
        id: 'user123',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();


    const mockComment = {
      _id: 'commentId',
      likes: [],
      save: jest.fn(),
    };
    Comment.findById = jest.fn().mockResolvedValue(mockComment);

    await likeComment(req, res, next);

   
    expect(Comment.findById).toHaveBeenCalledWith('commentId');
    expect(mockComment.likes).toContain('user123');
    expect(mockComment.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockComment);
    expect(next).not.toHaveBeenCalled();
  });
});
