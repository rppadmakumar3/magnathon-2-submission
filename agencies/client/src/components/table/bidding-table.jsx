import React from 'react';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';

// ----------------------------------------------------------------------

const BiddingsTable = ({ open, onClose }) => {
  // Dummy data for BiddingsTable
  const biddingsData = [
    { no: 1, agencyName: 'ABC Agency', ratings: 4.5, amount: '$500' },
    { no: 2, agencyName: 'XYZ Agency', ratings: 4.0, amount: '$700' },
    { no: 3, agencyName: 'LMN Agency', ratings: 3.5, amount: '$600' },
    { no: 4, agencyName: 'PQR Agency', ratings: 4.2, amount: '$800' },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Biddings Table</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} sx={{ width: 300 }}>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Agency Name</TableCell>
                <TableCell>Ratings</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
              {biddingsData.map((bid) => (
                <TableRow key={bid.no}>
                  <TableCell>{bid.no}</TableCell>
                  <TableCell>{bid.agencyName}</TableCell>
                  <TableCell>{bid.ratings}</TableCell>
                  <TableCell>{bid.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

BiddingsTable.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default BiddingsTable;
