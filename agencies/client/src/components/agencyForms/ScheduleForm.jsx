import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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

export default function CreateScheduleForm({ open, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    state: '',
    pickupDate: null,
    advancedPayment: '',
  });

  const [fetchedStates, setFetchedStates] = useState([]);
  const [country, setCountry] = useState('');
  const [states, setStates] = useState([]);
  const [currency, setCurrency] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [companyLocation, setCompanyLocation] = useState({
    country: '',
    state: '',
  });

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
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

  const handleSubmit = () => {
    // Implement your form submission logic here
    // For example, you can send the formData to a server or perform any other action
    console.log('Form submitted:', formData);

    // Call Mapbox API to show directions
    const { companyName, country, state } = formData;
    const origin = `Agency: ${companyName}, ${state}, ${country}`;
    const randomCoordinate = getRandomCoordinate();
    const destination = `${randomCoordinate.latitude}, ${randomCoordinate.longitude}`;
    const mapboxAPIKey = 'pk.eyJ1IjoicnBwYWRtYWt1bWFyIiwiYSI6ImNsZnIxZ2k2OTAxOWUzcXFmdG1hNzB6M2QifQ.pIrGQo39SSTOBRFN_4gdHg'; // Replace with your Mapbox API key
    const directionsURL = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?access_token=${mapboxAPIKey}`;

    // Open directions in a new tab
    window.open(directionsURL);

    onClose(); // Close the dialog after submission
  };

  function getRandomCoordinate() {
    const minLatitude = 8.0873; // Minimum latitude value for Tamil Nadu
    const maxLatitude = 11.1271; // Maximum latitude value for Kerala
    const minLongitude = 76.0789; // Minimum longitude value for Tamil Nadu
    const maxLongitude = 77.3473; // Maximum longitude value for Kerala

    const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
    const longitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;

    return { latitude, longitude };
  }

  const randomCoordinate = getRandomCoordinate();
  const destination = `${randomCoordinate.latitude}, ${randomCoordinate.longitude}`;
  console.log(destination);


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Schedule Pickup</DialogTitle>
      <DialogContent>
        <TextField
          label="Agency Name"
          fullWidth
          required
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          margin="normal"
        />

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>Country</InputLabel>
          <Select label="Country" value={formData.country} onChange={(e) => handleCountryChange(e.target.value)}>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
            <MenuItem value="Bangladesh">Bangladesh</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel>State</InputLabel>
          <Select
            label="State"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker label="Pick Date & Time" />
          </DemoContainer>
        </LocalizationProvider>

        {/* Bidding Amount Field */}
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="bid-amount-label">Currency</InputLabel>
          <Select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            {/* Add more currencies as needed */}
          </Select>
        </FormControl>

        <TextField
          label="Advanced Payment"
          fullWidth
          value={formData.advancedPayment}
          onChange={(e) => handleInputChange('advancedPayment', e.target.value)}
          margin="normal"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>

        <Button onClick={handleSubmit} variant="contained" color="primary">
          Schedule
        </Button>
      </DialogActions>
    </Dialog>


  );
}

CreateScheduleForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
