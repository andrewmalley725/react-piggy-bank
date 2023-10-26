import React, { useState } from "react";

const GOAL = 1000;

const App = () => {
  const [total, setTotal] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [option, setOption] = useState('');

  const newEntry = (e) => {
    if (option === 'allowance') {
      setTotal(parseFloat(total) + parseFloat(allowance));
      if (allowance !== 0) {
        setTransactions([...transactions, { description: description, amount: parseFloat(allowance) }]);
      }
      setAllowance(0);
      setDescription('');
    }

    else if (option === 'expense') {
      setTotal(parseFloat(total) - parseFloat(expense));
      if (expense !== 0) {
        setTransactions([...transactions, { description: description, amount: parseFloat(expense * -1) }]);
      }
      setExpense(0);
      setDescription('');
    }
    
    else {
      alert('Choose an option!')
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

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={savingsStyle}>Current savings: ${total.toFixed(2)}</h2>
      <p style={goalStatusStyle}>
        {total < GOAL
          ? `$${(GOAL - total).toFixed(2)} away from your goal`
          : "You met your goal!"}
      </p>
      <div>
        <select style={{marginRight: "10px",padding: "5px",borderRadius: "4px",border: "1px solid #ccc",}} onChange={(e) => setOption(e.target.value)}>
          <option selected disabled>Select an option</option>
          <option value='allowance'>Allowance</option>
          <option value='expense'>Expense</option>
        </select>
        <label>
          Amount:
          <input
            style={inputStyle}
            value={option === 'allowance' ? allowance : expense}
            type="number"
            min="0"
            max="100"
            onChange={(e) => {option === 'allowance' ? setAllowance(e.target.value) : setExpense(e.target.value)}}
            onKeyDown={(e) => handleKeyPress(e, "expense")}
          />
        </label>
        <label>
          Description:
          <input
            style={inputStyle}
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, "allowance")}
          />
        </label>
        <button type="button" onClick={newEntry}>
          Enter
        </button>
        <div style={{paddingTop: "25px"}}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                {transactions.length > 0 ? <td>{new Date().toLocaleDateString()}</td> : <></>}
                <td>{transaction.description}</td>
                <td>{transaction.amount > 0 ? `$${transaction.amount.toFixed(2)}` : ""}</td>
                <td>{transaction.amount < 0 ? `$${(transaction.amount * -1).toFixed(2)}` : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default App;
