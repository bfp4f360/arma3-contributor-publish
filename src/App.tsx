import React, { ReactNode, useState } from 'react';
import {
  MantineThemeOverride, // For creating custom theme
  MantineProvider       // To apply custom theme
} from '@mantine/core';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import AppShell from './components/AppShell'
import {views} from './data/views'

export default function App() {
  const myTheme: MantineThemeOverride = {
    colorScheme: 'dark',
  };

  return (
    <React.Fragment>
      <Router>
      <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
        <AppShell views={views}/>
      </MantineProvider>
      </Router>
    </React.Fragment>
  )
}