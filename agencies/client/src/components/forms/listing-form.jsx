import { ethers } from 'ethers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

import abi from '../contractJson/wastelisting.json';

const CONTRACT_ADDRESS = '0xeB34b4372bDA34df67B16189Aa1dca75E821663A';
const ABI = abi.abi;

export default function CreateListingForm({ open, onClose, etherState }) {
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [priceMode, setPriceMode] = useState('Fixed');
  const [currency, setCurrency] = useState('USD'); // Default currency
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [availableStates, setAvailableStates] = useState([]);

  const handleSave = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const quantityBigNumber = ethers.utils.parseUnits(quantity, 'ether');
      const fixedPriceBigNumber = priceMode === 'Fixed' ? ethers.utils.parseUnits(quantity, 'ether') : 0;

      const transaction = await contract.createListing(
        wasteType,
        quantityBigNumber,
        priceMode,
        currency,
        country,
        selectedState,
        fixedPriceBigNumber,
        { value: ethers.utils.parseUnits('0.000001', 'ether') }
      );

      await transaction.wait();

      alert('Listing created successfully on the blockchain');

      onClose();
    } catch (error) {
      alert(`Error creating listing: ${  error.message}`);
    }
  };

  const handleCountryChange = (selectedCountry) => {
    let fetchedStates = [];
    switch (selectedCountry) {
      case 'India':
        fetchedStates = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka'];
        break;
      case 'Sri Lanka':
        fetchedStates = ['Western', 'Central', 'Southern', 'Northern'];
        break;
      case 'Bangladesh':
        fetchedStates = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna'];
        break;
      default:
        fetchedStates = [];
    }

    setCountry(selectedCountry);
    setAvailableStates(fetchedStates);
  };

  const renderAdditionalFields = () => {
    if (priceMode === 'Fixed') {
      return (
        <>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="BDT">BDT</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Enter Amount"
            variant="outlined"
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </>
      );
    } if (priceMode === 'Biddings') {
      return (
        <TextField
          fullWidth
          label="Enter Amount"
          variant="outlined"
          margin="normal"
          value={0}
        />
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Listing</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Quantity in Kg"
          variant="outlined"
          margin="normal"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="waste-type-label">Waste Type</InputLabel>
          <Select
            label="Waste Type"
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
          >
            <MenuItem value="Chemical Waste">Chemical Waste</MenuItem>
            <MenuItem value="Electronic Waste (E-waste)">Electronic Waste (E-waste)</MenuItem>
            <MenuItem value="Metallurgical Waste">Metallurgical Waste</MenuItem>
            <MenuItem value="Plastic Waste">Plastic Waste</MenuItem>
            <MenuItem value="Wastewater">Wastewater</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="price-mode-label">Price Mode</InputLabel>
          <Select
            label="Price Mode"
            value={priceMode}
            onChange={(e) => setPriceMode(e.target.value)}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Biddings">Biddings</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            label="Country"
            value={country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            label="State"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {availableStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {renderAdditionalFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateListingForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  etherState: PropTypes.any,
};