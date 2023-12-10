import {Router} from "express";
import * as attachmentController from "../controllers/attachment";
import {Attachment} from "../interfaces";

const router: Router = Router();

router.get('/:id', async (req, res) => {
    const id: number = Number(req.params.id);
    const attachment: Attachment = await attachmentController.getById(id);

    const path: string = `${process.cwd()}/${attachment.path}`;
    res.setHeader('Content-Type', attachment.mimeType);
    res.sendFile(path);
});

export default router;