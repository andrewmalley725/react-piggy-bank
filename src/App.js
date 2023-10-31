import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ProgressBar from "react-progressbar";

import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";

const GOAL = 1000;

const App = () => {
  const [total, setTotal] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");

  const newEntry = (e) => {
    if (option === "allowance") {
      setTotal(parseFloat(total) + parseFloat(allowance));
      if (allowance !== 0) {
        setTransactions([
          ...transactions,
          { description: description, amount: parseFloat(allowance) },
        ]);
      }
      setAllowance(0);
      setDescription("");
    } else if (option === "expense") {
      setTotal(parseFloat(total) - parseFloat(expense));
      if (expense !== 0) {
        setTransactions([
          ...transactions,
          { description: description, amount: parseFloat(expense * -1) },
        ]);
      }
      setExpense(0);
      setDescription("");
    } else {
      alert("Choose an option!");
    }
  };

  const tableStyles = {
    border: "1px black solid",
    margin: "0 auto",
  };

  const savingsStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const goalStatusStyle = {
    fontSize: "18px",
    color: total < GOAL ? "red" : "green",
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      newEntry();
    }
  };

  const inputStyle = {
    width: "80px",
    marginRight: "10px",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const renderAdornment = () => {
    if (option === "expense") {
      return <InputAdornment position="start">-$</InputAdornment>;
    } else {
      return <InputAdornment position="start">$</InputAdornment>;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
      <div className="centered-progress-container">
        <div>
          <p>Savings Goal Progress </p>
        </div>
        <div className="limited-progress-bar">
          <ProgressBar completed={(total / GOAL) * 100} />
        </div>
        <div>
          <p>{Math.floor((total / GOAL) * 100)}% <i>(${total.toFixed(2)}/${GOAL})</i></p>
        </div>
      </div>
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
            min="0"
            max="100"
            value={option === "allowance" ? allowance : expense}
            onChange={(e) => {
              option === "allowance"
                ? setAllowance(e.target.value)
                : setExpense(e.target.value);
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
        <Button variant="contained" type="button" onClick={newEntry}>
          Enter
        </Button>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ m: 1, minWidth: 650 }}
            size="small"
            aria-label="transaction"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {transactions.length > 0 ? (
                    <TableCell component="th" scope="row">
                      {new Date().toLocaleDateString()}
                    </TableCell>
                  ) : (
                    <></>
                  )}
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {transaction.amount > 0
                      ? `$${transaction.amount.toFixed(2)}`
                      : ""}
                  </TableCell>
                  <TableCell>
                    {transaction.amount < 0
                      ? `$${(transaction.amount * -1).toFixed(2)}`
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
    </div>
  );
};

export default App;
