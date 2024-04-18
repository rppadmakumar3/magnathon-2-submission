// TableFile.jsx
import { ethers } from 'ethers';
import { IoMdBrowsers } from 'react-icons/io';
import React, { useState, useEffect, useMemo } from 'react';

import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import CreateScheduleForm from '../agencyForms/ScheduleForm';
import {
  Table,
  Paper,
  Dialog,
  Button,
  Popover,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
} from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import SearchFile from 'src/sections/orders/user-table-toolbar';

import abi from '../contractJson/wastelisting.json';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

const RetrieveFixTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const possiblePrices = useMemo(() => ['500', '1000', '2250', '2000', '2500'], []);
  const possibleCurrencies = useMemo(() => ['₹'], []);
  const possibleStatus = useMemo(() => ['Approved', 'Rejected'], []);

  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const connectedAddress = window.ethereum;

        const fetchedListings = await contract.getListings();

        // Assign unique 5-digit ID to each transaction and randomly assign price and status
        const listingsWithIds = fetchedListings.map((listing, index) => {
          const id = generateUniqueId(index);
          const randomPrice = possiblePrices[Math.floor(Math.random() * possiblePrices.length)];
          const randomCurrency = possibleCurrencies[Math.floor(Math.random() * possibleCurrencies.length)];
          const randomStatus = possibleStatus[Math.floor(Math.random() * possibleStatus.length)];

          return {
            ...listing,
            id,
            price: randomPrice,
            status: randomStatus,
            currency: randomCurrency,
          };
        });

        setListings(listingsWithIds);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [possibleCurrencies, possiblePrices, possibleStatus]);

  const [tlState, setTlState] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const handleOpenMenu = (event) => {
    setTlState(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setTlState(null);
  };

  const handleViewTimeline = () => {
    setShowTimeline(true);
    handleCloseMenu();
  };

  const handleCloseTimeline = () => {
    setShowTimeline(false);
  };


  const filteredListings = listings.filter((listing) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (listing.wasteType.toLowerCase().includes(lowerCaseSearchTerm) ||
        listing.country.toLowerCase().includes(lowerCaseSearchTerm) ||
        listing.state.toLowerCase().includes(lowerCaseSearchTerm)) &&
      listing.priceMode === 'Fixed'
    );
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedListings = filteredListings.slice(startIndex, endIndex);

  return (
    <>
      <SearchFile
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Listings ID</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price Mode</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Your Bid</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedListings.slice().reverse().map((listing, index) => (
              <TableRow key={index} hover tabIndex={-1} role="checkbox">
                <TableCell padding="checkbox">
                  <Checkbox disableRipple />
                </TableCell>
                <TableCell>{listing.id}</TableCell>
                <TableCell>{listing.wasteType}</TableCell>
                <TableCell>{ethers.utils.formatUnits(listing.quantity, 'ether')} Kg</TableCell>

                <TableCell>
                  <Label color={(listing.priceMode === 'Fixed' && 'error') || 'success'}>{listing.priceMode}</Label>
                </TableCell>

                <TableCell>{listing.country}, {listing.state}</TableCell>
                <TableCell>{listing.currency}{listing.price}</TableCell>

                <TableCell>
                  <Label color={(listing.status === 'Rejected' && 'error') || 'success'}>{listing.status}</Label>
                </TableCell>



                <TableCell align="right">
                {listing.status !== 'Rejected' && (
                  <IconButton onClick={handleOpenMenu}>
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
        open={Boolean(tlState)}
        anchorEl={tlState}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleViewTimeline}>
          <IoMdBrowsers style={{ marginRight: 8 }} />
          Schedule
        </MenuItem>
      </Popover>

      <Dialog open={showTimeline} onClose={handleCloseTimeline}>
        <DialogTitle>Order Timeline</DialogTitle>
        <DialogContent>
          <CreateScheduleForm open={showTimeline} onClose={handleCloseTimeline} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTimeline}>Close</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default RetrieveFixTable;

// Function to generate a fixed 5-digit unique number based on index
const generateUniqueId = (index) => {
  // Ensure the index is within the 5-digit range
  const formattedIndex = (index % 90000) + 10000;
  return `${formattedIndex}`;
};