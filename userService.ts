import { v4 as uuidv4 } from 'uuid';

export interface User {
  userID: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const users: User[] = [];

export const createUser = (user: Omit<User, 'userID'>): User => {
  const newUser = { ...user, userID: uuidv4() };
  users.push(newUser);
  return newUser;
};

export const listUsers = (): User[] => {
  return users;
};

export const getUserByID = (id: string): User | undefined => {
  return users.find(u => u.userID === id);
};

export const updateUser = (id: string, updated: Partial<User>): User | undefined => {
  const index = users.findIndex(u => u.userID === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updated };
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex(u => u.userID === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
