import * as ChatRepository from "../Repositories/ChatRepository.js";
import { spawn } from "child_process";

export const ReceiveMessage = async (request) => {
  try {
    // const pythonProcess = spawn('python', ['machine_learning.py', request.message_text]);

    // let reply = '';

    // pythonProcess.stdout.on('data', (data) => {
    //   // Handle the data received from the Python script
    //   reply += data.toString();
    // });

    // pythonProcess.on('close', (code) => {
    //   if (code === 0) {
    //     // return { message: reply, status: true };
    try {
      const reply_text = "hello this is a chatbot response";
      const Message = await ChatRepository.SaveMessage(request, reply_text);
      // const replyMessage = await ChatRepository.SendMessage(reply_text, request.message_id);
      return { message: reply_text, status: true };
    } catch (error) {
      // Handle the error here, you can log it or take appropriate actions
      console.error("An error occurred:", error);
      return { message: "An error occurred", status: false };
    }
    // } else {
    //   return { message: 'Machine learning module error', status: false };
    // }
    // });
  } catch (error) {
    throw error;
  }
};
