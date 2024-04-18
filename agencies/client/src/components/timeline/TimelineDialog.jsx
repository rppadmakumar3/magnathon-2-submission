import * as React from 'react';
import PropTypes from 'prop-types';

import Timeline from '@mui/lab/Timeline';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import DialogTitle from '@mui/material/DialogTitle';
import TimelineContent from '@mui/lab/TimelineContent';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function TimelineDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Order Timeline</DialogTitle>
      <DialogContent>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              12/12/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Confirmed</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              18/12/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Shipped</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              20/12/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Delivered</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              22/12/2023
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              
            </TimelineSeparator>
            <TimelineContent>Disposed</TimelineContent>
          </TimelineItem>
        </Timeline>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

TimelineDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};