import sequelize from "../util/database.js";
import {DataTypes} from "sequelize"

const Video = sequelize.define('SportsVideos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      videoId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      channelTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publishedAt: {
        type: DataTypes.DATE,
        // allowNull: false,
      },
      imageUrl: DataTypes.STRING,
})

export default Video;