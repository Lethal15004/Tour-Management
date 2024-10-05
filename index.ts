import express,{Express, Request, Response,NextFunction} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
import bodyParser from'body-parser';//Nhúng body-parser từ module body-parser
import { title } from 'process';
dotenv.config();//Thêm config cho dotenv
import sequelize from './config/database';//Nhúng database vào dự án

import routesClient from './routes/index.route';//Nhúng routes vào dự án

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

//Phần view engine -> Để render file pug (Quan trọng phải có)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)

sequelize; // Kết nối database Mysql thông qua Sequelize
routesClient(app); // Định tuyến routes

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});