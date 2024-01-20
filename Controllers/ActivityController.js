import * as ActivityService from "../Services/ActivityService.js";

export const ChatActivityDefine = async (req, res) => {
  try {
    const result = await ActivityService.DefineChatType(req.body);
    if (!result) {
      res.status(400).json({ status: false, message: result.message });
    } else {
      res.status(200).json({ message: result.message, status: true });
    }
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status: false });
  }
};

export const ActivityMessage = async (req, res) => {
  try {
    const result = await ActivityService.SendMessage(req.body);

    if (!result) {
      res.status(400).json({ status: false, message: result.message });
    } else {
      res.status(200).json({ message: result.message, status: true });
    }
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error", status: false });
  }
};
