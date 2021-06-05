import { Button, TextField } from "@material-ui/core";
import React from "react";

const Input = ({ message, setMessage, sendMessage, ...other }) => {
  return (
    <form {...other}>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Type a message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <Button
        variant='contained'
        color='secondary'
        onClick={(e) => sendMessage(e)}
        size='large'
      >
        Send
      </Button>
    </form>
  );
};

export default Input;
