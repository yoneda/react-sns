import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const MenuAppBar = props => {
  const { num, name } = props;
  return (
    <AppBar>
      <Toolbar>
        <Typography>Simple Diary</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MenuAppBar;
