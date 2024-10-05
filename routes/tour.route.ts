import express,{Router} from 'express';
const router : Router=express.Router();

import * as tourController from '../controller/tour.controller';

router.get('/',tourController.index);

export default router;