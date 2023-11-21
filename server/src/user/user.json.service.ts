import {User} from "./User";
import {UserService} from "./user.service";
import fs from 'fs';

export class UserJsonService implements UserService {
    private users: User[] = [];
    private dataFilePath: string = 'users.json';

    constructor() {
        this.loadUsers();
    }

    private saveUsers() {
        fs.writeFileSync(this.dataFilePath, JSON.stringify(this.users, null, 2));
    }

    private loadUsers() {
        try {
            const data = fs.readFileSync(this.dataFilePath, 'utf-8');
            this.users = JSON.parse(data);
        } catch (err) {
            this.users = [];
        }
    }

    public add(name: string, email: string, password: string): User {
        const id = this.users.length + 1;
        const user = new User(id, name, email, password);

        this.users.push(user);
        this.saveUsers();

        return user;
    }

    public getById(id: number): User | null {
        this.loadUsers();

        const existingUser = this.users.find((user: User) => user.id == id);
        return existingUser || null;
    }

    public getAll(): User[] {
        this.loadUsers();
        return this.users;
    }
}
