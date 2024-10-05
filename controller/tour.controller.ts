import { Request,Response } from "express";
import Tour from '../model/tour.model';//Nhúng model Tour vào dự án

export const index = async(req: Request, res: Response) => {
    const tours= await Tour.findAll({
        where:{
            deleted:false,
            status:'active'
        },
        raw:true // Để đảm bảo dữ liệu trả về là dạng mảng và đẹp hơn
    });
    res.render('client/pages/tours/index',{
        title:"Danh sách tour",
        tours:tours
    })
}