import express from "express"
import video from "./model/videos.js"
import sequelize from "./util/database.js"
import * as dotenv from "dotenv"
import ApiCalls from "./youtubeApiCalls.js"


dotenv.config()


const app = express();



sequelize
.sync()
.then((result) => {
  console.log("Connected to the server!")
  app.listen(8100);
})
.catch((err) => console.log(err));

 
