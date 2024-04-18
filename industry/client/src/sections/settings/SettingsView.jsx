import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const SettingsPage = () => {
  // State for form values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [agencyLocation, setAgencyLocation] = useState('');
  const [dummyFields, setDummyFields] = useState(['', '', '', '']);

  const handleDummyFieldChange = (index, value) => {
    const newDummyFields = [...dummyFields];
    newDummyFields[index] = value;
    setDummyFields(newDummyFields);
  };

  const handleSave = () => {
    // Implement save logic here
    console.log('Save clicked!');
  };

  const handleCancel = () => {
    // Implement cancel logic here
    console.log('Cancel clicked!');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Agency Name"
              fullWidth
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Agency Location"
              fullWidth
              value={agencyLocation}
              onChange={(e) => setAgencyLocation(e.target.value)}
            />
          </Grid>
          {/* Dummy Fields */}
          {[0, 1, 2, 3].map((index) => (
            <Grid item xs={12} key={index}>
              <TextField
                label={`Dummy Field ${index + 1}`}
                fullWidth
                value={dummyFields[index]}
                onChange={(e) => handleDummyFieldChange(index, e.target.value)}
              />
            </Grid>
          ))}
          <Grid item xs={1}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SettingsPage;