import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

import RecentOrdersTable from '../recent-orders';
import OngoingBiddingsTable from '../ongoing-bids';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';
import Chatbot from 'src/pages/Chatbot';
// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

     

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Waste Generated"
            total="100 tons"
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Revenue"
            total="$12000"
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Pending Biddings"
            total="7"
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Active Biddings"
            total="43"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Waste Disposed"
            subheader="(+23%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Plastic',
                  type: 'line',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Metal',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Hazardous',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Waste Type"
            chart={{
              series: [
                { label: 'Plastic', value: 4344 },
                { label: 'Metal', value: 5435 },
                { label: 'Chemical', value: 1443 },
                { label: 'Hazardous', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'January', value: 400 },
                { label: 'February', value: 430 },
                { label: 'March', value: 448 },
                { label: 'April', value: 470 },
                { label: 'May', value: 540 },
                { label: 'June', value: 580 },
                { label: 'July', value: 690 },
                { label: 'August', value: 1100 },
                { label: 'September', value: 1200 },
                { label: 'October', value: 1380 },
                { label: 'November', value: 1000 },
                { label: 'December', value: 1300 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <RecentOrdersTable />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <OngoingBiddingsTable
          />
        </Grid>

      </Grid>
    </Container>
  );
}
