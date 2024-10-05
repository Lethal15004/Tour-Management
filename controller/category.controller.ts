import { Request,Response } from "express";
import Category from '../model/category.model';//Nhúng model Tour vào dự án

export const index = async(req: Request, res: Response) => {
    const categories= await Category.findAll({
        where:{
            deleted:false,
            status:'active'
        },
        raw:true // Để đảm bảo dữ liệu trả về là dạng mảng và đẹp hơn
    });
    res.render('client/pages/categories/index',{
        title:"Danh mục tour",
        categories:categories
    })
}