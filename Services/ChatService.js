import { log } from "console";
import * as ChatRepository from "../Repositories/ChatRepository.js";
import { spawn } from "child_process";

// export const ReceiveMessage = async (request) => {
//   try {
//     // const pythonProcess = spawn('python', ['machine_learning.py', request.message_text]);

//     // let reply = '';

//     // pythonProcess.stdout.on('data', (data) => {
//     //   // Handle the data received from the Python script
//     //   reply += data.toString();
//     // });

//     // pythonProcess.on('close', (code) => {
//     //   if (code === 0) {
//     //     // return { message: reply, status: true };
//     try {
//       const reply_text = "Reply text working";
//       const Message = await ChatRepository.SaveMessage(request, reply_text);
//       // const replyMessage = await ChatRepository.SendMessage(reply_text, request.message_id);
//       if (!Message) {
//         return { message: "Message not saved", status: false };
//       } else {
//         return { message: reply_text, status: true };
//       }
//     } catch (error) {
//       // Handle the error here, you can log it or take appropriate actions
//       console.error("An error occurred:", error);
//       return { message: "An error occurred", status: false };
//     }
//     // } else {
//     //   return { message: 'Machine learning module error', status: false };
//     // }
//     // });
//   } catch (error) {
//     throw error;
//   }
// };

export const ReceiveMessage = async (request) => {
  try {
    const promptInput = request.message_text;
    const pythonProcess = spawn("python", ["path/to/chatbot.py", promptInput]);    
    // const pythonProcess = spawn('python', ['../Services/chatbot.py', input_message]);
    let reply = "";
    pythonProcess.stdout.on("data", (data) => {
      // Handle the data received from the Python script
      reply += data.toString();
      // You can process the 'reply' variable as needed
    });

    console.log("this is reply1:", reply);

    pythonProcess.on("close", async (code) => {
      console.log("code", code);
      if (code === 0) {
        console.log("this is reply2:", reply);
        try {
          // Process the reply from the Python script
          const reply_text = reply.trim();
          console.log("this is reply3:", reply_text);
          const Message = await ChatRepository.SaveMessage(request, reply_text);

          if (!Message) {
            return { message: "Message not saved", status: false };
          } else {
            return { message: reply_text, status: true };
          }
        } catch (error) {
          // Handle the error here, you can log it or take appropriate actions
          console.error("An error occurred:", error);
          return { message: "An error occurred", status: false };
        }
      } else {
        return { message: "Machine learning module error", status: false };
      }
    });
  } catch (error) {
    throw error;
  }
};
