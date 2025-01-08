import { WebClient } from "@slack/web-api";
import axios from "axios";
import { randomNumber } from "../utils/utils.js";

const colors = ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"];
const styles = ["avataaars", "adventurer", "big-smile", "micah", "pixel-art"];

export const changePP = async (req, res) => {
  try {
    const seed = Math.random().toString(36).substring(2, 15);
    const color = colors[randomNumber(0, 4)];
    const style = styles[randomNumber(0, 4)];

    const image = await axios.get(
      `https://api.dicebear.com/9.x/${style}/png?backgroundColor=${color}&seed=${seed}`,
      {
        responseType: "arraybuffer",
      }
    );

    const client = new WebClient();
    const slackRequest = await client.users.setPhoto({
      image: image.data,
      token: process.env.SLACK_TOKEN,
    });

    if (!slackRequest.ok) {
      throw new Error("Profile picture not updated");
    }

    res
      .status(200)
      .json({ status: true, pic: slackRequest.profile.image_original });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentPP = async (req, res) => {
  try {
    const client = new WebClient();

    const slackRequest = await client.users.info({
      token: process.env.SLACK_TOKEN,
      user: process.env.USER_ID,
    });

    if (!slackRequest.ok) {
      throw new Error("Internal server error");
    }
    res
      .status(200)
      .json({ status: true, pic: slackRequest.user.profile.image_original });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
