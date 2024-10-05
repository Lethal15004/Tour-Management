import express,{Router} from 'express';
const router : Router=express.Router();

import * as categoryController from '../controller/category.controller';

router.get('/',categoryController.index);

export default router;