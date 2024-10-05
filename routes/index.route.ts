//Router
import {Express} from 'express';

import tourRoute from './tour.route';

const routesClient = (app:Express)=>{
    app.use('/tours',tourRoute)
}

export default routesClient;