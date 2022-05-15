import React, { ReactNode, useState } from 'react';
import {
  MantineThemeOverride, // For creating custom theme
  MantineProvider       // To apply custom theme
} from '@mantine/core';

import {
  BrowserRouter as Router,
} from "react-router-dom";


export default function App() {
  const myTheme: MantineThemeOverride = {
    colorScheme: 'dark',
  };

  return (
    <React.Fragment>
      <Router>
      <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>

      </MantineProvider>
      </Router>
    </React.Fragment>
  )
}