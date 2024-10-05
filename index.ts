import express,{Express, Request, Response,NextFunction} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
import bodyParser from'body-parser';//Nhúng body-parser từ module body-parser
import { title } from 'process';
dotenv.config();//Thêm config cho dotenv

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

//Phần view engine -> Để render file pug (Quan trọng phải có)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)

import sequelize from './config/database';
sequelize; // Kết nối database Mysql thông qua Sequelize
import Tour from './model/tour.model';//Nhúng model Tour vào dự án

app.get('/tours', async (req:Request, res:Response) => {
    const tours= await Tour.findAll({
        where:{
            deleted:false,
            status:'active'
        },
        raw:true // Để đảm bảo dữ liệu trả về là dạng mảng và đẹp hơn
    });

    console.log(tours);
    res.render('client/pages/tours/index',{
        title:"Danh sách tour",
        tours:tours
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});