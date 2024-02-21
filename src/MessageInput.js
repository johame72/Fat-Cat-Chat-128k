// src\MessageInput.js
import React from 'react';

const MessageInput = ({ inputValue, setInputValue, handleKeyDown }) => (
  <textarea
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Type msg here, SHIFT+ENTER to send.."
    autoFocus
    rows={1}
  />
);

export default MessageInput;