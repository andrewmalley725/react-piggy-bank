import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { React, useState } from "react";

const AddTransactionInput = (props) => {
  let { 
    handleAddTransactionInput,
   } = props;

  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");

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
  
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      if (amount !== 0 && option !== '') {
        handleAddTransactionInput(description, amount, option);
      } 
    }
  }
  
  function handleClick(e) {
    if (amount !== 0 && option !== '') {
      handleAddTransactionInput(description, amount, option);
      setAmount(0);
      setDescription('');
    } else {
      alert('Something is missing...');
    }
  }

  console.log(props)
  return (
    <div style={{ textAlign: "center" }}>
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
      <div>
        <Button variant="contained" type="button" onClick={handleClick}>
          Enter
        </Button>
      </div>
    </div>
  );
};

export default AddTransactionInput;
