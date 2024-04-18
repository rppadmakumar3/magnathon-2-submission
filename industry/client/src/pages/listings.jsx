import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ListingsPage() {
  return (
    <>
      <Helmet>
        <title> Waste Listings </title>
      </Helmet>

      <UserView />
    </>
  );
}
