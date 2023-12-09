import {Request, Response, Router} from 'express';
import * as userController from "../controllers/user";
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from "../dataTransferObjects/user.dto";
import {User} from "../interfaces";
import {isAuthenticated} from "../infrastructure/authentication";

const usersRouter = Router();
usersRouter.get('/:id', isAuthenticated, async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const result: User = await userController.getById(id);
    return res.status(200).send(result);
});
usersRouter.get('/email/:email', isAuthenticated, async (req: Request, res: Response) => {
    const email: string = req.params.email;
    const result: User = await userController.getByEmail(email);
    return res.status(200).send(result);
});

usersRouter.put('/:id', isAuthenticated, async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const payload: UpdateUserDTO = req.body;

    const result: User = await userController.update(id, payload);
    return res.status(201).send(result);
});
usersRouter.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const result: boolean = await userController.deleteById(id);
    return res.status(204).send({
        success: result
    });
});
usersRouter.post('/', isAuthenticated, async (req: Request, res: Response) => {
    const payload:CreateUserDTO = req.body;
    const result: User = await userController.create(payload);
    return res.status(200).send(result);
});

usersRouter.get('/', isAuthenticated, async (req: Request, res: Response) => {
    const filters:FilterUsersDTO = req.body;
    const result: User[] = await userController.getAll(filters);
    return res.status(200).send(result);
});

export default usersRouter;