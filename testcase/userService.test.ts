import {
   createUser,
   listUsers,
   getUserByID,
   updateUser,
   deleteUser,
} from '../userService';

describe('userService', () => {
   let userID: string;

   it('should create a user', () => {
      const user = createUser({
         name: 'John Doe',
         email: 'john@example.com',
         phone: '1234567890',
         address: '123 Main St',
      });

      expect(user).toHaveProperty('userID');
      expect(user.name).toBe('John Doe');
      userID = user.userID;
   });

   it('should list users', () => {
      const users = listUsers();
      expect(users.length).toBeGreaterThan(0);
   });

   it('should get user by ID', () => {
      const user = getUserByID(userID);
      expect(user).toBeDefined();
      expect(user?.userID).toBe(userID);
   });

   it('should update user', () => {
      const updated = updateUser(userID, { name: 'Jane Doe' });
      expect(updated?.name).toBe('Jane Doe');
   });

   it('should delete user', () => {
      const deleted = deleteUser(userID);
      expect(deleted).toBe(true);

      const shouldBeGone = getUserByID(userID);
      expect(shouldBeGone).toBeUndefined();
   });

   it('should return undefined when updating non-existent user', () => {
      const result = updateUser('non-existent-id', { name: 'Ghost' });
      expect(result).toBeUndefined();
   });

   it('should return false when deleting non-existent user', () => {
      const result = deleteUser('non-existent-id');
      expect(result).toBe(false);
   });

});
