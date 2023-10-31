import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import React from 'react';

function TransactionTable(props) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ m: 1, minWidth: 650 }} size="small" aria-label="transaction">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Debit</TableCell>
                  <TableCell>Credit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.transactions.map((transaction, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {props.transactions.length > 0 ? (
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
  );
}

export default TransactionTable;

