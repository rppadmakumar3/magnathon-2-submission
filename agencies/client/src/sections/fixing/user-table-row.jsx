import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoMdBrowsers } from 'react-icons/io';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BiddingsTable from 'src/components/table/bidding-table';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  company,
  role,
  isVerified,
  status,
  handleClick,
}) {
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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{name}</TableCell>
        <TableCell>{company}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
}

UserTableRow.propTypes = {
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};