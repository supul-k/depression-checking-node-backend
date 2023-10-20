import * as UserRepository from "../Repositories/UserRepository.js";
import validator from "validator";

export const GetUserByEmail = async (email) => {
  try {
    var result = await UserRepository.GetUserByEmail(email);
    return result;
  } catch (error) {
    throw error;
  }
};

export const GetUserByEmailWithId = async (email, id) => {
  try {
    var result = await UserRepository.GetUserByEmailWithId(email, id);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ValidateEmail = async (email) => {
  try {
    var result = validator.isEmail(email);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ValidatePassword = async (password) => {
  try {
    // Define your password validation rules here
    // For example, checking if the password is at least 8 characters long
    // and contains at least one uppercase letter, one lowercase letter, one digit, and one special character.
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const result = passwordPattern.test(password);
    
    return result;
  } catch (error) {
    throw error;
  }
};

