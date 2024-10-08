import express,{Router} from 'express';
const router : Router=express.Router();

import * as tourController from '../controller/tour.controller';

router.get('/:slugCategory',tourController.index);
router.get('/detail/:slugTour',tourController.detail);
export default router;