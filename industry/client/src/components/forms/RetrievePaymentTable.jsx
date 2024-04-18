import { ethers } from 'ethers';

import React, { useState, useEffect, useMemo } from 'react';


import TablePagination from '@mui/material/TablePagination';
import {
    Table,
    Paper,
    Dialog,
    Button,
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
import TimelineDialog from '../timeline/TimelineDialog';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

const RetrievePaymentTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const possiblePrices = useMemo(() => ['50', '100', '150', '200', '250'], []);
    const possibleCurrencies = useMemo(() => ['₹'], []);
    const possibleStatus = useMemo(() => ['Paid', 'Not Paid'], []);

    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const currency = "INR";
    const receiptId = "qwsaq1";

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
                    const randomPrice = possiblePrices[Math.floor(Math.random() * possiblePrices.length)];
                    const randomCurrency = possibleCurrencies[Math.floor(Math.random() * possibleCurrencies.length)];
                    const randomStatus = possibleStatus[Math.floor(Math.random() * possibleStatus.length)];
                    const category = Math.random() < 0.5 ? 'Degradable' : 'Non-degradable';

                    return {
                        ...listing,
                        id,
                        price: randomPrice,
                        status: randomStatus,
                        currency: randomCurrency,
                        category,
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

    const handleViewTimeline = () => {
        setShowTimeline(true);
    };

    const handleCloseTimeline = () => {
        setShowTimeline(false);
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

    const paymentHandler = async (id) => {
        if (!window.Razorpay) {
            console.log('Razorpay Not Working');
            return;
        }
        const selectedListing = listings.find((listing) => listing.id === id);

        if (!selectedListing) {
            console.error('Listing not found for id:', id);
            return;
        }
        const response = await fetch("http://localhost:5000/order", {
            method: "POST",
            body: JSON.stringify({
                amount: selectedListing.price * 800,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        console.log(order);

        var options = {
            key: "rzp_test_HX4ZhYZ0b8Kz1f", // Enter the Key ID generated from the Dashboard
            amount: selectedListing.price * 800,
            currency,
            name: "SustainHub", //your business name
            description: "Test Transaction",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch(
                    "http://localhost:5000/order/validate",
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const jsonRes = await validateRes.json();
                console.log(jsonRes);
            },
            prefill: {
                //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                name: "Momentum Makers", //your customer's name
                email: "businessrpk30@gmail.com",
                contact: "9000000000", //Provide the customer's phone number for better conversion rates
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    };

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
                            <TableCell>ID</TableCell>
                            <TableCell>Waste Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Price</TableCell>
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
                                <TableCell>{listing.category}</TableCell>
                                <TableCell>{ethers.utils.formatUnits(listing.quantity, 'ether')} Kg</TableCell>
                                <TableCell>{listing.country}, {listing.state}</TableCell>
                                <TableCell>{listing.currency}{listing.price}</TableCell>
                                <TableCell><Label color='default' variant='filled'>{listing.status}</Label></TableCell>
                                <TableCell align="right">
                                    {listing.category === 'Non-degradable' && listing.status === 'Not Paid' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => paymentHandler(listing.id)} // Pass listing price as an argument
                                        >
                                            Pay Now
                                        </Button>
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

            <Dialog open={showTimeline} onClose={handleCloseTimeline}>
                <DialogTitle>Order Timeline</DialogTitle>
                <DialogContent>
                    <TimelineDialog open={showTimeline} onClose={handleCloseTimeline} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTimeline}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RetrievePaymentTable;

// Function to generate a fixed 5-digit unique number based on index
const generateUniqueId = (index) => {
    // Ensure the index is within the 5-digit range
    const formattedIndex = (index % 90000) + 10000;
    return `${formattedIndex}`;
};
