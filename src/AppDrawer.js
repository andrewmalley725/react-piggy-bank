import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { React, useState } from "react";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddTransactionInput from "./AddTransactionInput";
import SavingsIcon from '@mui/icons-material/Savings';
import SetGoalBox from "./SetGoalBox";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import Stats from "./Stats";
import TransactionTable from "./TransactionTable";

const drawerWidth = 240;

const AppDrawer = (props) => {
  let {
    transactions,
    handleAddTransactionInput,
    handleSetGoalBox,
    total,
    goal
  } = props;

  const [selectedItem, setSelectedItem] = useState("Transactions");

  const handleListItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Transactions":
        return <TransactionTable transactions={transactions} />;
      case "Goals":
        return (
          <div>
            <Stats total={total} goal={goal}/>
            <SetGoalBox handleSetGoalBox={handleSetGoalBox} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{padding: '0 16px'}}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1}}>
            <SavingsIcon/>
            <Typography variant="h6" sx={{ ml: 1 }}>
              Piggy Bank
            </Typography>
          </Box>
          <AddTransactionInput handleAddTransactionInput={handleAddTransactionInput} />
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
          <ListItem disablePadding selected={selectedItem === "Transactions"} onClick={() => handleListItemClick("Transactions")}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={selectedItem === "Goals"} onClick={() => handleListItemClick("Goals")}>
          <ListItemButton>
            <ListItemIcon>
              <SportsScoreIcon />
            </ListItemIcon>
              <ListItemText primary="Goals" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgColor: "background.default", p: 3 }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AppDrawer;
