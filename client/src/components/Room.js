import React from "react";

import { Box, Typography, makeStyles } from "@material-ui/core";

import { firstUppercaseText } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: theme.spacing(2),
  },
}));

const Room = ({ room }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant='h5' color='primary'>
        {firstUppercaseText(room)}
      </Typography>
    </Box>
  );
};

export default Room;
