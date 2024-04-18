import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppView } from 'src/sections/overview/view';
import Chatbot from './Chatbot';

// ----------------------------------------------------------------------



export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Industry Dashboard </title>
      </Helmet>

      <AppView />
      <Chatbot />
      
    </>
  );
}
