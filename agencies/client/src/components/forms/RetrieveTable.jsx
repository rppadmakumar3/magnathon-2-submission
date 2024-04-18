import { ethers } from 'ethers';
import { IoMdBrowsers } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import {
  Table,
  Paper,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer
} from '@mui/material';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import UserSearchFile from 'src/sections/user/user-table-toolbar';
import CreateBiddingForm from '../agencyForms/bidding-form';
import CreateFixedForm from '../agencyForms/fixed-form';
import abi from '../contractJson/wastelisting.json';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

const RetrieveTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(null);
  const [openFixed, setOpenFixed] = useState(null);
  const [showAddBidForm, setshowAddBidForm] = useState(false);
  const [showAddFixForm, setshowAddFixForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const connectedAddress = window.ethereum;
        const fetchedListings = await contract.getListings();
        const listingsWithIds = fetchedListings.map((listing, index) => ({ ...listing, id: generateUniqueId(index) }));
        setListings(listingsWithIds);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleViewBiddings = () => {
    setshowAddBidForm(true);
    handleCloseMenu();
  };

  const handleCloseBiddingsTable = () => {
    setshowAddBidForm(false);
  };

  const handleOpenMenuFixed = (event) => {
    setOpenFixed(event.currentTarget);
  };

  const handleCloseMenuFixed = () => {
    setOpenFixed(null);
  };

  const handleViewBiddingsFixed = () => {
    setshowAddFixForm(true);
    handleCloseMenuFixed();
  };

  const handleCloseBiddingsFixed = () => {
    setshowAddFixForm(false);
  };

  const filteredListings = listings.filter((listing) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      listing.wasteType.toLowerCase().includes(lowerCaseSearchTerm) ||
      listing.country.toLowerCase().includes(lowerCaseSearchTerm) ||
      listing.state.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedListings = filteredListings.slice(startIndex, endIndex);

  return (
    <>
      <UserSearchFile value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Listings ID</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price Mode</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Fixed Price</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedListings.slice().reverse().map((listing, index) => (
              <TableRow key={index}>
                <TableCell>{listing.id}</TableCell>
                <TableCell>{listing.wasteType}</TableCell>
                <TableCell>{ethers.utils.formatUnits(listing.quantity, 'ether')} Kg</TableCell>
                <TableCell>
                  <Label color={(listing.priceMode === 'Fixed' && 'error') || 'success'}>{listing.priceMode}</Label>
                </TableCell>
                <TableCell>{listing.currency}</TableCell>
                <TableCell>{listing.country}</TableCell>
                <TableCell>{listing.state}</TableCell>
                <TableCell>{new Date(listing.timestamp * 1000).toLocaleString()}</TableCell>
                <TableCell>{ethers.utils.formatUnits(listing.fixedPrice, 'ether')}</TableCell>
                <TableCell align="right">
                  {listing.priceMode !== 'Fixed' && (
                    <IconButton onClick={handleOpenMenu}>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  )}
                  {listing.priceMode === 'Fixed' && (
                    <IconButton onClick={handleOpenMenuFixed}>
                      <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        page={page}
        component="div"
        count={filteredListings.length}
        rowsPerPage={rowsPerPage}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(event) => {
          setPage(0);
          setRowsPerPage(parseInt(event.target.value, 10));
        }}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {paginatedListings.length > 0 && paginatedListings[0].priceMode !== 'Fixed' && (
          <MenuItem onClick={handleViewBiddings}>
            <IoMdBrowsers style={{ marginRight: 8 }} />
            Add Bid
          </MenuItem>
        )}
      </Popover>


      <Popover
        open={Boolean(openFixed)}
        anchorEl={openFixed}
        onClose={handleCloseMenuFixed}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {/* Content for the "Fixed" price mode Popover */}
        <MenuItem onClick={handleViewBiddingsFixed}>
          <IoMdBrowsers style={{ marginRight: 8 }} />
          Request
        </MenuItem>
      </Popover>

      <Dialog open={showAddBidForm} onClose={handleCloseBiddingsTable}>
        <DialogTitle>Add Your Bid</DialogTitle>
        <DialogContent>
          <CreateBiddingForm open={showAddBidForm} onClose={handleCloseBiddingsTable} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBiddingsTable}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showAddFixForm} onClose={handleCloseBiddingsFixed}>
        <DialogTitle>Add Your Bid</DialogTitle>
        <DialogContent>
          <CreateFixedForm open={showAddFixForm} onClose={handleCloseBiddingsFixed} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBiddingsFixed}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Function to generate a fixed 5-digit unique number based on index
const generateUniqueId = (index) => {
  const formattedIndex = (index % 90000) + 10000;
  return `${formattedIndex}`;
};

export default RetrieveTable;
