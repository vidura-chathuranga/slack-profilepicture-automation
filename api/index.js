const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

const images = {
  morning:
    "https://i.pinimg.com/564x/00/b1/ad/00b1ad02a4d71788154f1631f93f079e.jpg",
  afternoon:
    "https://i.pinimg.com/564x/dc/90/9c/dc909c5c6e5e70a8dcf625477270f095.jpg",

  evening:
    "https://i.pinimg.com/564x/d1/9e/be/d19ebe0590f313cd6ade19da320151f3.jpg",
  night:
    "https://i.pinimg.com/564x/ae/0f/b5/ae0fb5afd183d634f5c77e167d303c10.jpg",
};

async function setPFP() {
  var hour = Math.floor(new Date().getHours() + 5.3);
  let image;
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  } else if (12 < hour && hour < 15) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  } else if (15 < hour && hour < 20) {
    image = await axios.get(images.evening, {
      responseType: "arraybuffer",
    });
  } else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  image = await axios.get(image, {
    responseType: "arraybuffer",
  });
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN,
  });
}

export default async function (req, res) {
  await setPFP();
  res.send("Started changing your profile picture");
}
