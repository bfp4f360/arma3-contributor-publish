import React from 'react';
import './App.css';
import MainPage from './routes/main'
import { MantineProvider } from '@mantine/core';

export default function App() {
  return (
    <React.Fragment>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <MainPage />
      </MantineProvider>
    </React.Fragment>
  )
}