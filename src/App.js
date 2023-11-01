import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React, { useState } from "react";

import AppDrawer from "./AppDrawer";

const App = () => {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleAddTransactionInput = (description, amount, option) => {
    addTransaction(description, amount, option, total);
  }
  
  const addTransaction = (description, amount, option) => {
    if (option === 'allowance') {
      setTotal(parseFloat(total) + parseFloat(amount));
      setTransactions([...transactions, { description: description, amount: parseFloat(amount) }]);
    }

    else if (option === 'expense') {
      setTotal(parseFloat(total) - parseFloat(amount));
      setTransactions([...transactions, { description: description, amount: parseFloat(amount * -1) }]);
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
        <AppDrawer
          transactions={transactions}
          handleAddTransactionInput={handleAddTransactionInput}
          total={total}
          goal={1000}
        />
      </div>
    </div>
  );
};

export default App;