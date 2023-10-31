import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {Button, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, { useState } from "react";

import AppDrawer from "./AppDrawer";

const GOAL = 1000;

const App = () => {
  const [total, setTotal] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [option, setOption] = useState('');


  const handleAddTransactionInput = (description, amount, option) => {
    addTransaction(description, amount, option);
  }
  
  const addTransaction = (description, amount, option) => {
    if (option === 'allowance') {
      setTotal(parseFloat(total) + parseFloat(amount));
      setTransactions([...transactions, { description: description, amount: parseFloat(amount) }]);
    }

    else if (option === 'expense') {
      setTotal(parseFloat(total) - parseFloat(amount));
      setTransactions([...transactions, { description: description, amount: parseFloat(amount * -1) }]);
      setExpense(0);
      setDescription('');
    }
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
      addTransaction();
    }
  };

  const inputStyle = {
    width: "80px",
    marginRight: "10px",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  

  return (
    <div>
      <div>
        <AppDrawer 
          allowance={allowance}
          setAllowance={setAllowance}
          expense={expense}
          setExpense={setExpense}
          addTransaction={addTransaction}
          description={description}
          setDescription={setDescription}
          option={option}
          setOption={setOption}
          handleKeyPress={handleKeyPress}
          transactions={transactions}
          handleAddTransactionInput={handleAddTransactionInput}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
        <p style={goalStatusStyle}>
          {total < GOAL
            ? `$${(GOAL - total).toFixed(2)} away from your goal`
            : "You met your goal!"}
        </p>
      </div>
    </div>
  );
};

export default App;
