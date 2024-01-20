import { log } from "console";
import * as ChatRepository from "../Repositories/ChatRepository.js";
import { spawn } from "child_process";

export const DefineChatType = async (request) => {
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
    const input_message = request;
    console.log(input_message);
    const pre_prompt =
      "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'.";

    const reply = await runPythonScript(input_message, pre_prompt, {
      encoding: "utf-8",
    });

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

export const SendMessage = async (request) => {
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
    const input_message = request;
    console.log(input_message);
    const pre_prompt =
      "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'.";

    const reply = await runPythonScript(input_message, pre_prompt, {
      encoding: "utf-8",
    });

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
