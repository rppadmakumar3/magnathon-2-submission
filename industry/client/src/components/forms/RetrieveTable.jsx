import { ethers } from 'ethers';
import { IoMdBrowsers } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
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
  TableContainer
} from '@mui/material';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import UserSearchFile from 'src/sections/user/user-table-toolbar';

import abi from '../contractJson/wastelisting.json';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

const RetrieveTable = () => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const connectedAddress = window.ethereum.selectedAddress;

        const fetchedListings = await contract.getListings();
        // Filter the transactions based on the connected wallet address
        const filteredListings = fetchedListings.filter((listing) => listing && listing.from && listing.from.toLowerCase() === connectedAddress.toLowerCase());

        // Assign unique 5-digit ID to each transaction
        const listingsWithIds = filteredListings.map((listing, index) => ({ ...listing, id: generateUniqueId(index) }));

        setListings(listingsWithIds);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, []);

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
    navigate('/biddings');
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
      <UserSearchFile
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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

                <TableCell>
                  {listing.currency}
                </TableCell>
                <TableCell>{listing.country}</TableCell>
                <TableCell>{listing.state}</TableCell>
                <TableCell>{new Date(listing.timestamp * 1000).toLocaleString()}</TableCell>
                <TableCell>{ethers.utils.formatUnits(listing.fixedPrice, 'ether')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={handleOpenMenu}>
                    <Iconify icon="eva:more-vertical-fill" />
                  </IconButton>
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
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <IoMdBrowsers style={{ marginRight: 8 }} />
          View Biddings
        </MenuItem>
      </Popover>
    </>


  );
};

export default RetrieveTable;

// Function to generate a fixed 5-digit unique number based on index
const generateUniqueId = (index) => {
  // Ensure the index is within the 5-digit range
  const formattedIndex = (index % 90000) + 10000;
  return `${formattedIndex}`;
};