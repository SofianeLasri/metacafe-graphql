import { User } from './User';

export interface UserService {
    add(name: string, email: string, password: string): User;
    getById(id: number): User | null;
    getAll(): User[];
}