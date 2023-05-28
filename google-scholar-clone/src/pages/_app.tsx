
import type { AppProps } from 'next/app'
import { Component } from 'react'
import { Container, Button, TextInput, Paper } from '@mantine/core';
import React from 'react';
import { Home } from './home';
import { MyPage } from './mypage';

export default function App({ Component, pageProps }: AppProps) {
  const [inputValue, setInputValue] = React.useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    alert(`Input value: ${inputValue}`);
  };

  return (
    // <Container >
    //   <Paper padding="lg" shadow="xs" style={{ maxWidth: 400, margin: '50% auto' }}>
    //     <img
    //       src="/google-scholar-logo.png"
    //       alt="Google Scholar"
    //       style={{ width: '200px', marginBottom: '1.5rem' }}
    //     />
    //     <TextInput
    //       label="Search articles"
    //       value={inputValue}
    //       onChange={handleInputChange}
    //       placeholder="Enter keywords"
    //       required
    //       style={{ marginBottom: '1rem' }}
    //     />
    //     <Button variant="gradient" fullWidth onClick={handleButtonClick}>
    //       Search
    //     </Button>
    //     <p style={{ textAlign: 'center', marginTop: '1rem' }}>
    //       Advanced search
    //       <span style={{ marginLeft: '0.5rem', color: '#007bff', cursor: 'pointer' }}>
    //         - Scholar preferences
    //       </span>
    //     </p>
    //   </Paper>
    // </Container>
<MyPage />

  );

}
