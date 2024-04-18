import { Helmet } from 'react-helmet-async';

import { BiddingsView } from 'src/sections/biddings/view';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Biddings </title>
      </Helmet>

      <BiddingsView />
    </>
  );
}
