import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";

export const SaveMessage = async (request, reply_text) => {
  try {
    return await new Promise((resolve, reject) => {
      const timestamp = new Date();
      console.log("data to instert::::::",request.user_id, request.message_text, reply_text, timestamp);
      dbConnection.query(
        sqlQuaries.saveMessage,
        [
          request.user_id,
          request.message_text,
          reply_text,
          timestamp
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