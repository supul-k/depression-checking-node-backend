import * as ChatRepository from "../Repositories/ChatRepository.js";
import { spawn } from 'child_process';

export const ReceiveMessage = async (request) => {
  try {
    const Message = await ChatRepository.ReceiveMessage(request);
    if (Message) {
      // const pythonProcess = spawn('python', ['machine_learning.py', request.message_text]);

      // let reply = '';

      // pythonProcess.stdout.on('data', (data) => {
      //   // Handle the data received from the Python script
      //   reply += data.toString();
      // });

      // pythonProcess.on('close', (code) => {
      //   if (code === 0) {
      //     // return { message: reply, status: true };
          return { message: "hello this is a chatbot response", status: true };
        // } else {
        //   return { message: 'Machine learning module error', status: false };
        // }
      // });
    } else {
      return {message: "Please enter message again!", status: false};
    }
  } catch (error) {
    throw error;
  }
};