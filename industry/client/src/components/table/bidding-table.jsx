import React, { useState } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Label from 'src/components/label';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';

// ----------------------------------------------------------------------

const BiddingsTable = () => {
  const [acceptedRow, setAcceptedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [rejectNotificationOpen, setRejectNotificationOpen] = useState(false);

  // Dummy data for BiddingsTable
  const biddingsData = [
    { no: 1, agencyName: 'Green Planet', ratings: 4.5, amount: '$500' },
    { no: 2, agencyName: 'Green Way Industries', ratings: 4.0, amount: '$700' },
    { no: 3, agencyName: 'Ehs360 Labs', ratings: 3.5, amount: '$600' },
    { no: 4, agencyName: 'VNS Enviro', ratings: 4.2, amount: '$800' },
  ];

  const handleAccept = (rowNo) => {
    setAcceptedRow(rowNo);
    setNotificationOpen(true);
  };

  const handleReject = (rowNo) => {
    setAcceptedRow(null);
    setRejectNotificationOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOpen(false);
  };

  const handleRejectNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setRejectNotificationOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Biddings Table</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Biddings Table</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ width: 500 }}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Agency Name</TableCell>
                  <TableCell>Ratings</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
                {biddingsData.map((bid) => (
                  <TableRow key={bid.no}>
                    <TableCell>{bid.no}</TableCell>
                    <TableCell>{bid.agencyName}</TableCell>
                    <TableCell>{bid.ratings}</TableCell>
                    <TableCell>{bid.amount}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAccept(bid.no)}
                      >
                        Accept
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(bid.no)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleNotificationClose}
          severity="success"
        >
          Request Sent to the Agency
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={rejectNotificationOpen}
        autoHideDuration={6000}
        onClose={handleRejectNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleRejectNotificationClose}
          severity="error"
        >
          Bid Rejected!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default BiddingsTable;