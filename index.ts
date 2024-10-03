import express,{Express, Request, Response,NextFunction} from 'express';
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
import bodyParser from'body-parser';//Nhúng body-parser từ module body-parser
dotenv.config();//Thêm config cho dotenv

const app: Express = express();
const port : number | string =process.env.PORT ||3000;

app.use(express.static(`${__dirname}/public`));//Định tuyến file tĩnh (Quan trọng phải có)



app.get('/', (req:Request, res:Response) => {
    res.send("Trang chủ");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});