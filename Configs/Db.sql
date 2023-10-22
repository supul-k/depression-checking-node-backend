CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE chat_messages (
  message_id varchar(255) PRIMARY KEY,
  user_id varchar(255) DEFAULT NULL,
  message_text text NOT NULL,
  reply_text text DEFAULT NULL,
  timestamp datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;