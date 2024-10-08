import { Request,Response } from "express";
import Tour from '../model/tour.model';//Nhúng model Tour vào dự án
import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { Json } from "sequelize/types/utils";

export const index = async(req: Request, res: Response) => {
    const slugCategory=`${req.params.slugCategory}`;
    /*
        SELECT tours.*, price * (1 - discount/100) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
        categories.slug = 'du-lich-trong-nuoc'
        AND categories.deleted = false
        AND categories.status = 'active'
        AND tours.deleted = false
        AND tours.status = 'active';
    */
    const tours= await sequelize.query(`
        SELECT tours.*, ROUND(price*(1-discount/100)) as price_special
        FROM tours
        JOIN tours_categories ON tours.id=tours_categories.tour_id
        JOIN categories ON tours_categories.category_id=categories.id
        WHERE
            categories.slug='${slugCategory}'
            AND categories.deleted=false
            AND categories.status='active'
            AND tours.deleted=false
            AND tours.status='active'
        `,{
        type:QueryTypes.SELECT,
    });
    for(const item of tours){
        if(item['images']){
            const arrayImages = JSON.parse(item['images']);
            if(arrayImages.length>0){
                item['image']=arrayImages[0];
            }
        }
        item['price_special']=parseInt(item['price_special']);
    }
    res.render('client/pages/tours/index',{
        title:"Danh sách tour",
        tours:tours
    })
}
export const detail= async (req: Request, res: Response) => {
    const slugTour :string =`${req.params.slugTour}`;
    // const tour = await sequelize.query(`
    //     SELECT tours.*, ROUND(price*(1-discount/100)) as price_special
    //     FROM tours
    //     WHERE slug='${slugTour}'
    //     AND deleted=false
    //     AND status='active'
    // `,{
    //     type:QueryTypes.SELECT,
    // });
    const tour=await Tour.findOne({
        where:{
            slug:slugTour,
            deleted:false,
            status:'active'
        },
        raw:true
    })
    const arrayImages = JSON.parse(tour['images']);
    tour['images']=[];
    tour['price_special']=Math.round(tour['price']*(1-tour['discount']/100));
    
    for(const image of arrayImages){
        tour['images'].push(image);
    }

    res.render('client/pages/tours/detail',{
        title:'Chi tiết tour',
        tour:tour
    });
}
