
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
<MyPage />

  );

}
