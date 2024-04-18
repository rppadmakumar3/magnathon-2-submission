import { Helmet } from 'react-helmet-async';

import { OrderView } from 'src/sections/orders/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Orders </title>
      </Helmet>

      <OrderView />
    </>
  );
}
