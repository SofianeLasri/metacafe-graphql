import {User} from './User';
import {UserService} from './user.service';

export class UserController {
    constructor(private userService: UserService) {
    }

    add(name: string, email: string, password: string): User {
        return this.userService.add(name, email, password);
    }

    getById(id: number): User | null {
        return this.userService.getById(id);
    }

    getAll(): User[] {
        return this.userService.getAll();
    }
}