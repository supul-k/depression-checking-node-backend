import dbConnection from "../Configs/DbConnection.js";
import * as sqlQuaries from "../Utils/Sql.js";
import bcrypt from "bcrypt";

export const GetUserByEmail = async (email) => {
  try {
    return new Promise((resolve, reject) => {
      dbConnection.query(sqlQuaries.getUserByEmail, email, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (request) => {
  const encrypted_password = await bcrypt.hash(request.password, 10);
  try {
    return new Promise((resolve, reject) => {
      dbConnection.query(
        sqlQuaries.createUserQuery,
        [request.username, request.email, encrypted_password],
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

// export const GetUser = async () => {
//   try {
//     return new Promise((resolve, reject) => {
//       dbConnection.query(sqlQuaries.getUserByEmail, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   } catch (error) {
//     throw error;
//   }
// };
