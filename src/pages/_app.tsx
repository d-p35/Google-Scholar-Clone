
import type { AppProps } from 'next/app'
import { Component } from 'react'
import { Container, Button, TextInput, Paper } from '@mantine/core';
import React from 'react';
import Home from './home';
import MyPage from "./mypage"


export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
  <MyPage />
  </>);
}
