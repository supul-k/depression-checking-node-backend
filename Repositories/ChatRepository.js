import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";

export const ReceiveMessage = async (request) => {
  try {
    return await new Promise((resolve, reject) => {
      dbConnection.query(
        sqlQuaries.saveMessage,
        [
          request.user_id,
          request.message_text,
          request.message_type,
          request.message_text
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
