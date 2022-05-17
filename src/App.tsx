import React, { useEffect , useState } from 'react';
import {
  MantineThemeOverride, // For creating custom theme
  MantineProvider       // To apply custom theme
} from '@mantine/core';

// for the views
import {
  BrowserRouter as Router,
} from "react-router-dom";

// React stuff
import AppShell from './components/AppShell'
import {views} from './data/views'
import {ProjectContext,DefaultData,saveDataFile,readDataFile,app_constants} from './data/context'


export default function App() {
  const myTheme: MantineThemeOverride = {
    colorScheme: 'dark',
  };

  
  //Update the context data and pass along to children
  const [presetData, setPresetData] = useState(DefaultData);
  const value = { presetData, setPresetData };

  useEffect(() => {
    readDataFile(app_constants.APP_DATA_JSON).then((value: string)=>{
      try {
        setPresetData(JSON.parse(value as string))
      } catch (e) {
        console.error(e);
        setPresetData(DefaultData)
      }
    })
  },[])

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