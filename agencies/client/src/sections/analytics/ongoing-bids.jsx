import React from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

export default function OngoingBiddingsTable() {
  // Dummy data for the table
  const ongoingBiddings = [
    { id: 1, highestBid: 50, totalBids: 10 },
    { id: 2, highestBid: 30, totalBids: 5 },
    { id: 3, highestBid: 40, totalBids: 8 },
    { id: 4, highestBid: 60, totalBids: 12 },
    { id: 5, highestBid: 25, totalBids: 15 },
  ];

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="div" sx={{ p: 2 }}>
        Ongoing Biddings
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Highest Bid</TableCell>
            <TableCell>Total no Bids</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ongoingBiddings.map((bid) => (
            <TableRow key={bid.id}>
              <TableCell>{bid.id}</TableCell>
              <TableCell>{bid.highestBid}</TableCell>
              <TableCell>{bid.totalBids}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}