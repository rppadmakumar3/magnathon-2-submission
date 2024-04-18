import { Helmet } from 'react-helmet-async';
import { OrderView } from 'src/sections/orders/view';

import { PaymentView } from 'src/sections/payments/view';

// ----------------------------------------------------------------------

export default function PaymentsPage() {
  return (
    <>
      <Helmet>
        <title> Pending Payments </title>
      </Helmet>

      <PaymentView />
    </>
  );
}
