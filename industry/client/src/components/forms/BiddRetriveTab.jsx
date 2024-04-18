import { ethers } from 'ethers';
import { IoMdBrowsers } from 'react-icons/io';
import React, { useState, useEffect, useMemo } from 'react';

import MenuItem from '@mui/material/MenuItem';
import TablePagination from '@mui/material/TablePagination';
import Label from 'src/components/label';
import {
    Table,
    Paper,
    Button,
    Dialog,
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
    TableContainer
} from '@mui/material';

import Iconify from 'src/components/iconify';
import BiddingsTable from 'src/components/table/bidding-table';

import BidSearchFile from 'src/sections/biddings/user-table-toolbar';

import abi from '../contractJson/wastelisting.json';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

const BiddRetrieveTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const possibleHighestBid = useMemo(() => ['2500', '1500', '1000', '750', '650'], []);
    const possibleCurrencies = useMemo(() => ['₹'], []);
    const possibleBids = useMemo(() => ['8', '14', '30', '48', '24'], []);

    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

                const connectedAddress = window.ethereum.selectedAddress;

                const fetchedListings = await contract.getListings();
                // Filter the transactions based on the connected wallet address
                const filteredListings = fetchedListings.filter((listing) => listing && listing.from && listing.from.toLowerCase() === connectedAddress.toLowerCase());

                // Assign unique 5-digit ID to each transaction and randomly assign price and status
                const listingsWithIds = filteredListings.map((listing, index) => {
                    const id = generateUniqueId(index);
                    const randomHighestBid = possibleHighestBid[Math.floor(Math.random() * possibleHighestBid.length)];
                    const randomCurrency = possibleCurrencies[Math.floor(Math.random() * possibleCurrencies.length)];
                    const randomBids = possibleBids[Math.floor(Math.random() * possibleBids.length)];

                    return {
                        ...listing,
                        id,
                        highbid: randomHighestBid,
                        bids: randomBids,
                        currency: randomCurrency,
                    };
                });

                setListings(listingsWithIds);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchData();
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [showBiddingsTable, setShowBiddingsTable] = useState(false);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleViewBiddings = () => {
        setShowBiddingsTable(true);
        handleCloseMenu();
    };

    const handleCloseBiddingsTable = () => {
        setShowBiddingsTable(false);
    };

    const filteredListings = listings.filter((listing) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
            (listing.wasteType.toLowerCase().includes(lowerCaseSearchTerm) ||
                listing.country.toLowerCase().includes(lowerCaseSearchTerm) ||
                listing.state.toLowerCase().includes(lowerCaseSearchTerm))
        );
    });


    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const paginatedListings = filteredListings.slice(startIndex, endIndex);


    return (
        <>

            <BidSearchFile
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Listing ID</TableCell>
                            <TableCell>Waste Type</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Highest Bid</TableCell>
                            <TableCell>No of Bid</TableCell>
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
                                <TableCell>{listing.country}, {listing.state}</TableCell>
                                <TableCell>{listing.currency}{listing.highbid}</TableCell>
                                <TableCell><Label color='default' variant='filled'>{listing.bids}</Label></TableCell>
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
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: { width: 140 },
                }}
            >
                <MenuItem onClick={handleViewBiddings}>
                    <IoMdBrowsers style={{ marginRight: 8 }} />
                    View Biddings
                </MenuItem>
            </Popover>

            <Dialog open={showBiddingsTable} onClose={handleCloseBiddingsTable}>
                <DialogTitle>Biddings Table</DialogTitle>
                <DialogContent>
                    <BiddingsTable open={showBiddingsTable} onClose={handleCloseBiddingsTable} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBiddingsTable}>Close</Button>
                </DialogActions>
            </Dialog>
        </>


    );
};

export default BiddRetrieveTable;

// Function to generate a fixed 5-digit unique number based on index
const generateUniqueId = (index) => {
    // Ensure the index is within the 5-digit range
    const formattedIndex = (index % 90000) + 10000;
    return `${formattedIndex}`;
};