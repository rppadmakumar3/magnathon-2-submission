import { Helmet } from 'react-helmet-async';

import { PaymentView } from 'src/sections/payments/view';
import { OrderView } from 'src/sections/orders/view';

// ----------------------------------------------------------------------

export default function PaymentPage() {
  return (
    <>
      <Helmet>
        <title> Pending Payments </title>
      </Helmet>

      <PaymentView />
    </>
  );
}