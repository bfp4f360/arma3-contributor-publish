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
import {ProjectContext,DefaultData} from './data/context'

export default function App() {
  const myTheme: MantineThemeOverride = {
    colorScheme: 'dark',
  };
  
  const [presetData, setPresetData] = useState(DefaultData);
  const value = { presetData, setPresetData };

  // const ProjectContext = React.createContext({
  //   presetData: {},
  //   setPresetData: () => {}
  // });
  //console.log("APP",presetData.selectedPreset)
  return (
    <React.Fragment>

      <ProjectContext.Provider 
        // @ts-ignore
        value={value}
      >
      <Router>
      <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
        <AppShell views={views}/>
      </MantineProvider>
      </Router>
      </ProjectContext.Provider>
    </React.Fragment>
  )
}