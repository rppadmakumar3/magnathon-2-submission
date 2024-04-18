import React from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

export default function RecentOrdersTable() {
  // Dummy data for the table
  const recentOrders = [
    { id: 1, type: 'Product A', quantity: 10, date: '2024-01-15' },
    { id: 2, type: 'Product B', quantity: 5, date: '2024-01-14' },
    { id: 3, type: 'Product C', quantity: 8, date: '2024-01-13' },
    { id: 4, type: 'Product D', quantity: 12, date: '2024-01-12' },
    { id: 5, type: 'Product E', quantity: 15, date: '2024-01-11' },
  ];

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="div" sx={{ p: 2 }}>
        Recent Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.type}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}