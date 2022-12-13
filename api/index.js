import express from "express"
// import video from "./model/videos.js"
import sequelize from "./util/database.js"
import * as dotenv from "dotenv"
import ApiCalls from "./youtubeApiCalls.js"
import router from "./routes/video.js"


dotenv.config()


const app = express();

app.use("/api/videos", router);

sequelize
.sync()
.then((result) => {
  console.log("Connected to the server!")
  app.listen(8100);
})
.catch((err) => console.log(err));

 
