import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";

export const SaveMessage = async (request, reply_text) => {
  try {
    return await new Promise((resolve, reject) => {
      console.log(request.user_id, request.message_text, reply_text);
      dbConnection.query(
        sqlQuaries.saveMessage,
        [
          request.user_id,
          request.message,
          reply_text
        ],
        (err, result) => {
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  } catch (error) {
    throw error;
  }
};