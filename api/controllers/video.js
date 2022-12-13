import Video from "../model/videos.js"
import {Op} from 'sequelize';

const getVideos = (req, res)=>{
    const search = req.query.search? req.query.search :"";
    const limitTo = Number(req.query.perpagecount? req.query.perpagecount : "10");
    const pagenumber = Number(req.query.pagenumber? req.query.pagenumber : "0");
    const offsetBy = limitTo*pagenumber
    
    Video.findAll({
      offset: offsetBy, 
      limit: limitTo,
      order: [
        ['publishedAt', 'DESC']
      ],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
    })
      .then((videos) => {
        res.status(200).json(videos);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json("No Response Found");
      });
}

export default getVideos;