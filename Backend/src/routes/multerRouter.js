import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";

const multerRouter = Router()

multerRouter.post('/', upload.single('product'), insertImg)

export default multerRouter