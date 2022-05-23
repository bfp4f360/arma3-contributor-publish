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
import {ProjectContext,DefaultData,saveDataFile,readDataFile,app_constants,DefaultSettings} from './data/context'


export default function App() {
  const myTheme: MantineThemeOverride = {
    colorScheme: 'dark',
  };

  
  //Update the context data and pass along to children
  const [presetData, setPresetData] = useState(DefaultData);
  const [settingsData, setSettingsData] = useState(DefaultSettings);
  const [globalDisableRouteButtons, setDisableRoutes] = useState(false);

  //Context that is passed around
  const value = { presetData, setPresetData,settingsData,setSettingsData };

  useEffect(() => {
    // read the presets.json file
    readDataFile(app_constants.APP_DATA_JSON).then((value: string)=>{
      try {
        setPresetData(JSON.parse(value as string))
      } catch (e) {
        console.error(e);
        setPresetData(DefaultData)
        saveDataFile(DefaultData,app_constants.APP_DATA_JSON)
      }
    })

    // read the settings.json file
    readDataFile(app_constants.APP_SETTINGS_JSON).then((value: string)=>{
      try {
        setSettingsData(JSON.parse(value as string))
      } catch (e) {
        console.error(e); 
        setSettingsData(DefaultSettings)
        saveDataFile(DefaultSettings,app_constants.APP_SETTINGS_JSON)
      }
    })
  },[])

  return (
    <React.Fragment>

      <ProjectContext.Provider 
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