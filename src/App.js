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
    <div>
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