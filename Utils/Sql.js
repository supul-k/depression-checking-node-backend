export const saveMessage =
  "INSERT INTO chat_messages (message_id, user_id, message_text, message_type) VALUES (UUID(), ?, ?, ?)";

export const getUserByEmail = "SELECT * FROM users WHERE email = ?";

export const createUserQuery =
  "INSERT INTO users (user_id, username, email, password) VALUES (UUID(), ?, ?, ?)";

