import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Fragment, React, useState } from "react";

import AddIcon from '@mui/icons-material/Add';

const AddTransactionInput = (props) => {
  let { 
    handleAddTransactionInput,
   } = props;

  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");
  const [open, setOpen] = useState(false);

  const renderAdornment = () => {
    if (option === "expense") {
      return (
        <InputAdornment position="start">-$</InputAdornment>
      )
    } else {
      return (
        <InputAdornment position="start">$</InputAdornment>
      )
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form from being submitted
      if (amount !== 0 && option !== '') {
        setAmount(0);
        setDescription('');
        handleClose();
        handleAddTransactionInput(description, amount, option);
      } else {
        alert('Something is missing...');
      }
    }
  }
  
  function handleClick(e) {
    if (amount !== 0 && option !== '') {
      handleAddTransactionInput(description, amount, option);
      setAmount(0);
      setDescription('');
      handleClose();
    } else {
      alert('Something is missing...');
    }
  }

  console.log(props)
  return (
    <Fragment>
      <Button   
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer,
          color: 'inherit' // inherit color from parent element
        }}
        variant="outlined" 
        startIcon={<AddIcon/>} 
        onClick={handleClickOpen}
      >
        Add transaction
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add transaction</DialogTitle>
        <DialogContent>
          <div>
            <FormControl sx={{ m: 1, minWidth: 130 }}>
              <InputLabel id="transaction-select-label">Type</InputLabel>
              <Select
                labelId="transaction-select-label"
                id="transaction-select"
                label="Transaction"
                onChange={(e) => setOption(e.target.value)}
              >
                <MenuItem value="allowance">Allowance</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <OutlinedInput
                id="amount"
                startAdornment={renderAdornment()}
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                onKeyDown={(e) => handleKeyPress(e)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 445 }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <OutlinedInput
                id="description"
                label="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddTransactionInput;
