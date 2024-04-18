// SearchFile.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify'; // Import TextField

const BidSearchFile = ({ numSelected, value, onChange, onFilterOption }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleSelectFilter = (filterOption) => {
    onFilterOption(filterOption);
    handleCloseFilter();
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <>
          {/* Render only one set of components based on the condition */}
          <TextField
            value={value}
            onChange={onChange}
            placeholder="Search Orders..."
            sx={{ margin: '0 0 1rem' }}
          />

          <Tooltip title="Filter list">
            <IconButton onClick={handleClickFilter}>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseFilter}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {['Newly Added', 'Highest Bid', 'Lowest Bid', 'Oldest', 'Name'].map((option) => (
              <MenuItem key={option} onClick={() => handleSelectFilter(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Toolbar>
  );
};

BidSearchFile.propTypes = {
  numSelected: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onFilterOption: PropTypes.func,
};

export default BidSearchFile;