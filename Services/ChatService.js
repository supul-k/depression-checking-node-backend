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

// export const ReceiveMessage = async (request) => {
//   try {
//     const input_message = request.message_text;
//     const pre_prompt = "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'."
//     const pythonProcess = spawn("python", [
//       "D:/Web_Applications/Depression-Chat-App/depression-checking-node-backend/chatbot.py",
//       input_message, pre_prompt
//     ]);
//     // const pythonProcess = spawn('python', ['../Services/chatbot.py', input_message]);
//     let reply = "";
//     pythonProcess.stdout.on("data", (full_response) => {
//       // Handle the data received from the Python script
//       reply += full_response.toString();
//       // You can process the 'reply' variable as needed
//     });

//     pythonProcess.stderr.on("data", (error) => {
//       console.error(`Error from Python script: ${error}`);
//     });

//     console.log("this is reply1:", reply);

//     pythonProcess.on("close", async (code) => {
//       console.log("code", code);
//       if (code === 0) {
//         console.log("this is reply2:", reply);
//         try {
//           // Process the reply from the Python script
//           const reply_text = reply.trim();
//           console.log("this is reply3:", reply_text);
//           const Message = await ChatRepository.SaveMessage(request, reply_text);

//           if (!Message) {
//             return { message: "Message not saved", status: false };
//           } else {
//             return { message: reply_text, status: true };
//           }
//         } catch (error) {
//           // Handle the error here, you can log it or take appropriate actions
//           console.error("An error occurred:", error);
//           return { message: "An error occurred", status: false };
//         }
//       } else {
//         return { message: "Machine learning module error", status: false };
//       }
//     });
//   } catch (error) {
//     throw error;
//   }
// };

export const ReceiveMessage = async (request) => {
  const runPythonScript = (input_message, pre_prompt) => {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "D:/Web_Applications/Depression-Chat-App/depression-checking-node-backend/chatbot.py",
        input_message,
        pre_prompt,
      ]);

      let reply = "";

      pythonProcess.stdout.on("data", (full_response) => {
        reply += full_response.toString();
      });

      pythonProcess.stderr.on("data", (error) => {
        console.error(`Error from Python script: ${error}`);
      });

      pythonProcess.on("close", (code) => {
        console.log("Python script exited with code", code);

        if (code === 0) {
          resolve(reply);
        } else {
          reject(new Error("Machine learning module error"));
        }
      });
    });
  };

  try {
    const input_message = request.message_text;
    const pre_prompt =
      "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'.";

    const reply = await runPythonScript(input_message, pre_prompt, { encoding: 'utf-8' });

    const reply_text = reply.trim();
    console.log("Response from Python script:", reply_text);

    const Message = await ChatRepository.SaveMessage(request, reply_text);

    if (!Message) {
      return { message: "Message not saved", status: false };
    } else {
      return { message: reply_text, status: true };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { message: "Internal server error", status: false };
  }
};

export const EvaluateMessage = async (request) => {
  const runPythonScript = (evaluate_data) => {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "D:/Web_Applications/Depression-Chat-App/depression-checking-node-backend/chatbot.py",
        evaluate_data
      ]);

      let reply = "";

      pythonProcess.stdout.on("data", (full_response) => {
        reply += full_response.toString();
      });

      pythonProcess.stderr.on("data", (error) => {
        console.error(`Error from Python script: ${error}`);
      });

      pythonProcess.on("close", (code) => {
        console.log("Python script exited with code", code);

        if (code === 0) {
          resolve(reply);
        } else {
          reject(new Error("Machine learning module error"));
        }
      });
    });
  };

  try {
    const evaluate_data = request;

    // const reply = await runPythonScript(evaluate_data, { encoding: 'utf-8' });

    // console.log("Response from Python script:", reply);
    const reply = '80%'; 
    if (!reply) {
      return { message: "Evaluation failed", status: false };
    } else {
      return { message: reply, status: true };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { message: "Internal server error", status: false };
  }
};
