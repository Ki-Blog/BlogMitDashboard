import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from '../controllers/user.controller.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import request from 'supertest';
import { app, server } from '../index.js';
import mongoose from 'mongoose';

jest.setTimeout(30000);

jest.mock('../models/user.model.js', () => ({
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
  countDocuments: jest.fn(),
  findById: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(),
}));

afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('test', () => {
    it('should return a JSON object with message "is it working"', async () => {
      const res = await request(app).get('/api/user/test');
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('is it working');
    });
  });

  // describe('updateUser', () => {
  //   it('should update user data when provided correct input', async () => {
  //     const req = {
  //       user: { id: 'userId'},
  //       params: { userId: 'userId' },
  //       body: {
  //         username: 'newUsername',
  //         email: 'newEmail@example.com',
  //         profilePicture: 'newPictureUrl',
  //         password: 'newPassword',
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const next = jest.fn();
  
  //     bcryptjs.hashSync.mockReturnValue('hashedPassword');
  
  //     const updatedUser = {
  //       username: 'newUsername',
  //       email: 'newEmail@example.com',
  //       profilePicture: 'newPictureUrl',
  //     };
  //     User.findByIdAndUpdate.mockResolvedValue(updatedUser);
  
  //     await updateUser(req, res, next);
  
  //     expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
  //       'userId',
  //       {
  //         $set: {
  //           username: 'newUsername',
  //           email: 'newEmail@example.com',
  //           profilePicture: 'newPictureUrl',
  //           password: 'hashedPassword',
  //         },
  //       },
  //       { new: true }
  //     );
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       username: 'newUsername',
  //       email: 'newEmail@example.com',
  //       profilePicture: 'newPictureUrl',
  //     });
  //     expect(next).not.toHaveBeenCalled();
  //   });
  // });

  describe('deleteUser', () => {
    it('should delete a user when provided correct input', async () => {
      const req = {
        user: { isAdmin: true, id: 'userId' },
        params: { userId: 'userId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.findByIdAndDelete.mockResolvedValue();

      await deleteUser(req, res, next);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('userId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Benutzer wurde gelöscht');
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('signout', () => {
    it('should sign out a user', async () => {
      const req = {};
      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await signout(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith('access_token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('Der Benutzer wurde erfolgreich abgemeldet');
      expect(next).not.toHaveBeenCalled();
    });
  });

  // describe('getUsers', () => {
  //   it('should get all users when user is admin', async () => {
  //     const req = {
  //       user: { isAdmin: true },
  //       query: { startIndex: '0', limit: '10', sort: 'asc' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const next = jest.fn();
  
  //     const users = [{ username: 'user1' }, { username: 'user2' }];
  //     User.find.mockResolvedValue(users);
  
     
  //     const mockCountDocuments = jest.spyOn(User, 'countDocuments');
  //     mockCountDocuments.mockResolvedValueOnce(2); 
  //     mockCountDocuments.mockResolvedValueOnce(1); 
  
  //     await getUsers(req, res, next);
  
  //     expect(User.find).toHaveBeenCalled();
  //     expect(User.countDocuments).toHaveBeenCalledTimes(2); 
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       users: [{ username: 'user1' }, { username: 'user2' }],
  //       totalUsers: 2,
  //       lastMonthUsers: 1,
  //     });
  //     expect(next).not.toHaveBeenCalled();
  //   });

  //   it('should return 403 error when user is not admin', async () => {
  //     const req = {
  //       user: { isAdmin: false },
  //       query: { startIndex: '0', limit: '10', sort: 'asc' },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };
  //     const next = jest.fn();

  //     await getUsers(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expect.objectContaining({
  //       statusCode: 403,
  //       message: 'Du bist nicht berechtigt, alle Nutzer zu sehen',
  //     }));
  //   });
  // });

  describe('getUser', () => {
    it('should get user by ID', async () => {
      const req = {
        params: { userId: 'userId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      const user = { _doc: { username: 'user1' } };
      User.findById.mockResolvedValue(user);

      await getUser(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('userId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ username: 'user1' });
    });

    it('should return 404 if user not found', async () => {
      const req = {
        params: { userId: 'userId' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      User.findById.mockResolvedValue(null);

      await getUser(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        statusCode: 404,
        message: 'Benutzer nicht gefunden',
      }));
    });
  });
});
