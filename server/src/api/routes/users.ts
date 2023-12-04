import {Request, Response, Router} from 'express';
import * as userController from "../controllers/user";
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from "../dataTransferObjects/ingredient.dto";
import {User} from "../interfaces";

const usersRouter = Router();
usersRouter.get(':/id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const result: User = await userController.getById(id);
    return res.status(200).send(result);
});
usersRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const payload: UpdateUserDTO = req.body;

    const result: User = await userController.update(id, payload);
    return res.status(201).send(result);
});
usersRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    const result: boolean = await userController.deleteById(id);
    return res.status(204).send({
        success: result
    });
});
usersRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateUserDTO = req.body;
    const result: User = await userController.create(payload);
    return res.status(200).send(result);
});

usersRouter.get('/', async (req: Request, res: Response) => {
    const filters:FilterUsersDTO = req.body;
    const result: User[] = await userController.getAll(filters);
    return res.status(200).send(result);
});

export default usersRouter;