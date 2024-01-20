import * as ChatService from "../Services/ChatService.js";

export const ReceiveMessage = async (req, res) => {
  console.log(req.body);
    try {
      const result = await ChatService.ReceiveMessage(req.body);
      if (!result) {
        res.status(400).json({ status: false, message: result.message });
      } else {
        res.status(200).json({ message: result.message, status: true });
      }
    } catch (error) {
      res.status(400).json({ error: "Internal Server Error", status: false });
    }
  };

  export const EvaluateMessage = async (req, res) => {
    console.log(req.body);
      try {
        console.log(req.body)
        const result = await ChatService.EvaluateMessage(req.body);
        
        if (!result) {
          res.status(400).json({ status: false, message: result.message });
        } else {
          res.status(200).json({ message: result.message, status: true });
        }
      } catch (error) {
        res.status(400).json({ error: "Internal Server Error", status: false });
      }
    };