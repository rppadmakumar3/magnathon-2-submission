import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

export default function CreateFixedForm({ open, onClose }) {
  const [wasteType, setWasteType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [priceMode, setPriceMode] = useState('Fixed');
  const [currency, setCurrency] = useState('USD');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [states, setStates] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [companyLocation, setCompanyLocation] = useState({
    country: '',
    state: '',
  });
  const [estimatedPickupDate, setEstimatedPickupDate] = useState(null);

  const handleSave = () => {
    console.log('Waste Type:', wasteType);
    console.log('Quantity:', quantity);
    console.log('Price Mode:', priceMode);
    console.log('Currency:', currency);
    console.log('Country:', companyLocation.country);
    console.log('State:', companyLocation.state);
    console.log('Bid Amount:', bidAmount);
    console.log('Estimated Pickup Date:', estimatedPickupDate);

    onClose();
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
    setStates(fetchedStates);
    setCompanyLocation({ country: selectedCountry, state: '' });
  };

  const renderAdditionalFields = () => {
    if (priceMode === 'Fixed') {
      return (
        <>

          
          
        </>
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Request Order</DialogTitle>
      <DialogContent>

      <TextField
            fullWidth
            label="Company Name"
            variant="outlined"
            margin="normal"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

        {/* Country Field */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            label="Country"
            value={companyLocation.country}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>

        {/* State Field */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            label="State"
            value={companyLocation.state}
            onChange={(e) => setCompanyLocation({ ...companyLocation, state: e.target.value })}
          >
            {states.map((state) => (
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
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}