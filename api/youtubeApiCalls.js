import axios from "axios"
import Video from "./model/videos.js"
import * as dotenv from "dotenv"

dotenv.config()

const API_KEYS = JSON.parse(process.env.API_KEYS);
const date = "2022-11-22T00:00:00Z";
let i = 0;
let API_KEY = API_KEYS.keys[i];
let PAGE_TOKEN = "";
let Youtube_Data;
let status = "Successful"

// console.log(API_KEY.keys[0])

/*
    Query Parameters Passed
    
    part: snippet (Provides the details of the video)
    eventType: completed (Returns Only those videos which have been uploaded)
    maxResults: 50 (Result per page 50)
    order: date (Returns videos which were uploaded recently)
    publishedAfter: 2022-11-22T00:00:00Z
    q: cricket|football|tennis|badminton|hockey|volleyball|chess|golf (Returns videos related to these top 10 sports)
    relevanceLanguage: en (Only videos in English)
    type: video
    videoDefinition: high 
    pageToken: (At a time we get only 50 max results therefore pageToken keeps track of which page to return)
*/

const youtube_api_call = async () => {
    try {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&pageToken=${PAGE_TOKEN}&eventType=completed&maxResults=50&order=date&publishedAfter=2022-11-22T00%3A00%3A00Z&q=cricket%7Cfootball%7Ctennis%7Cbadminton%7Chockey%7Cvolleyball%7Cchess%7Cgolf&relevanceLanguage=en&type=video&videoDefinition=high&key=${API_KEY}`;
        // console.log(url);
        const res = await axios.get(url);
        PAGE_TOKEN = res.data.nextPageToken;
        Youtube_Data = res.data.items;
    } catch (err) {
        console.log(err);
    }
}

setInterval(() => {
    youtube_api_call()
    .then(() => {
        const videos = [];
        Youtube_Data.map((video) => {
            // const data = [];
            videos.push({
                videoId : video.id.videoId,
                title : video.snippet.title,
                channelTitle : video.snippet.channelTitle,
                description : video.snippet.description,
                publishedAt : new Date(video.snippet.publishedAt),
                imageUrl : video.snippet.thumbnails.high.url
            })
        })

        // Adding all videos to the database
        Video.bulkCreate(videos)
        .then((result) => {
            console.log("Videos Added!");
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        i += 1;
        API_KEY = API_KEYS.keys[i];
        status = "Failed";
        console.log(err);
    })
}, 10000);


export default status;

