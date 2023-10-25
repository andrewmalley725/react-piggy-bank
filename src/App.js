import React, { useState } from "react";

const GOAL = 1000;

const App = () => {
  const [total, setTotal] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const newAllowance = () => {
    setTotal(parseFloat(total) + parseFloat(allowance));
    if (allowance !== 0) {
      setTransactions([...transactions, allowance]);
    }
    setAllowance(0);
  };

  const addAllowance = (e) => {
    setAllowance(e.target.value);
  };


  const addExpense = (e) => {
    setExpense(e.target.value);
  };

  const newExpense = () => {
    setTotal(parseFloat(total) - parseFloat(expense));
    if (expense !== 0) {
      setTransactions([...transactions, expense * -1]);
    }
    setExpense(0);
  };

  const savingsStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const goalStatusStyle = {
    fontSize: "18px",
    color: total < GOAL ? "red" : "green",
  };

  const handleKeyPress = (e, focus) => {
    if (e.key === 'Enter') {
      if (focus === 'allowance') {
        newAllowance();
      } else if (focus === 'expense') {
        newExpense();
      }
    }
  }

  const inputStyle = {
    width: "80px",
  marginRight: "10px",
  padding: "5px",
  borderRadius: "4px",
    border: "1px solid #ccc",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
      <p style={goalStatusStyle}>
        {total < GOAL
          ? `$${(GOAL - total).toFixed(2)} away from your goal`
          : "You met your goal!"}
      </p>
      <div>
        <label>
          Enter allowance:
          <input
            style={inputStyle}
            value={allowance}
            type="number"
            min="0"
            max="100"
            onChange={addAllowance}
            onKeyDown={((e) => handleKeyPress(e, 'allowance'))}
          />
        </label>
        <button type="button" onClick={newAllowance}>
          Enter
        </button>
      </div>
      <div>
        <label>
          Enter expense:
          <input
            style={inputStyle}
            value={expense}
            type="number"
            min="0"
            max="100"
            onChange={addExpense}
            onKeyDown={((e) => handleKeyPress(e, 'expense'))}
          />
        </label>
        <button type="button" onClick={newExpense}>
          Enter
        </button>
      </div>
      <table>
        <tr>
          <th>Total</th>
        </tr>
        {transactions.map((value, index) => {
          return (
            <tr key = {index}>
              <td>{value}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default App;
