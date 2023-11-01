import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { useEffect, useState } from "react";

import AppDrawer from "./AppDrawer";

const App = () => {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [goal, setGoal] = useState(1000);
  
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/transactions.json')
    .then(response => response.json())
    .then(data => {
      setTransactions(data);
      let newTotal = 0;
      data.forEach(transaction => {
        if (transaction.amount > 0) {
          newTotal += parseFloat(transaction.amount);
        } else {
          newTotal -= parseFloat(transaction.amount);
        }
      });
      setTotal(newTotal);
    })
    .catch(error => console.error(error));
  }, []);

  const handleAddTransactionInput = (description, amount, option) => {
    addTransaction(description, amount, option, total);
  }
  const handleSetGoalBox = (goal) => {
    setGoal(goal);
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
      <div>
        <AppDrawer
          transactions={transactions}
          handleAddTransactionInput={handleAddTransactionInput}
          handleSetGoalBox={handleSetGoalBox}
          total={total}
          goal={goal}
        />
      </div>
    </div>
  );
};

export default App;