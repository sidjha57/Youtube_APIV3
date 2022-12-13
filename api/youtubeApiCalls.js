import axios from "axios"
import Video from "./model/videos.js"
import * as dotenv from "dotenv"

dotenv.config()

const API_KEYS = JSON.parse(process.env.API_KEYS);
const DATE = "2022-11-22T00:00:00Z";
let i = 0;
let API_KEY = API_KEYS.keys[i];
let PAGE_TOKEN = "";
let status = "Successful"

const youtube_api_call = async () => {
    try {
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&pageToken=${PAGE_TOKEN}&eventType=completed&maxResults=50&order=date&publishedAfter=${DATE}&q=cricket%7Cfootball%7Ctennis%7Cbadminton%7Chockey%7Cvolleyball%7Cchess%7Cgolf&relevanceLanguage=en&type=video&videoDefinition=high&key=${API_KEY}`;
        // console.log(url);
        const res = await axios.get(url);
        PAGE_TOKEN = res.data.nextPageToken;
        return res.data.items
    } catch (err) {
        console.log(err);
        const code = err.response.data.error.code;
        const message = err.response.data.error.details[0].reason;
        throw ({code,message});
    }
}

// Calling API's with the interval of 10 seconds
setInterval(() => {
    youtube_api_call()
    .then((Youtube_Data) => {
        const videos = [];
        Youtube_Data.map((video) => {
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
        // If API Quota Exceeds Move to the next API key
        if (err.code == 403 && err.message == "quotaExceeded") {
            i += 1;
            i %= API_KEYS.length; // i should not increase than the number of API Keys
            API_KEY = API_KEYS.keys[i];
        }
        status = "Failed";
        console.log(err);
    })
}, 10000);


export default status;

