const { WebClient } = require("@slack/web-api");
const axios = require("axios").default;
const dotenv = require("dotenv");
dotenv.config();

const images = {
  morning:
    "https://i.pinimg.com/236x/9d/0e/25/9d0e25417e25e6b3186a42fd74daffcc.jpg",
  afternoon:
    "https://i.pinimg.com/564x/aa/e8/17/aae81731d92bbd08bea03fcbda2a3d84.jpg",
  evening:
    "https://i.pinimg.com/564x/ae/0f/b5/ae0fb5afd183d634f5c77e167d303c10.jpg",
  night:
    "https://i.pinimg.com/736x/0a/7c/45/0a7c45b6f8796525e9d0399882b57b24.jpg",
};

async function setPFP() {
  var hour = Math.floor(new Date().getHours());
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

  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN,
  });
}

