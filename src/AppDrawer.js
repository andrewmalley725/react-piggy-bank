import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  InboxIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MailIcon,
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import { React, useState } from "react";

import AddTransactionInput from "./AddTransactionInput";
import TransactionTable from "./TransactionTable";

const drawerWidth = 240;

const AppDrawer = (props) => {
  let {
    transactions,
    handleAddTransactionInput,
  } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Budgeting app
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgColor: "background.default", p: 3 }}
      >
        <Toolbar />
        <AddTransactionInput
          handleAddTransactionInput={handleAddTransactionInput}
        />
        <TransactionTable transactions={transactions} />
      </Box>
    </Box>
  );
};

export default AppDrawer;
