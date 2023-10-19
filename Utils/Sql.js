export const saveMessage =
  "INSERT INTO chat_messages (message_id, user_id, message_text, message_type) VALUES (UUID(), ?, ?, ?)";