import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="SustainHub-Industry"
      agent-id="3110e852-272a-478f-b3f6-4ba209ba7281"
      language-code="en"
    ></df-messenger>
  );
};

export default Chatbot;
