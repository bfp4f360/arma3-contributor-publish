import React, { ReactNode, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  MantineThemeOverride,
  ThemeIcon,
  MantineProvider
} from '@mantine/core';

import { Button } from '@mantine/core';
import { Settings,Upload } from 'tabler-icons-react';

import MainPage from "../../routes/main"
import SettingsPage from "../../routes/settings"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch
} from "react-router-dom";

const pages = [
  {
    displayName: "Publish",
    path:"/",
    leftIcon: <Upload />,
    component: <MainPage />,
    color: 'indigo'
  },
  {
    displayName: "Settings",
    path:"/routes/settings",
    leftIcon: <Settings />,
    component: <SettingsPage />,
    color:'yellow'
  }
]

export default function App() {
  



  const [opened, setOpened] = useState(false);
  return (
    
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            {pages.map((page,index)=>(
              <Button 
                key={index}
                variant="subtle" color="gray" 
                leftIcon={
                    <ThemeIcon size="md" variant="light" color={page.color}>
                        {page.leftIcon}
                    </ThemeIcon>
                } 
                style={{display:'flex',justifyContent:'left'}}
                component={Link} to={page.path}
              >
                {page.displayName}
              </Button>
            ))}  
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>{`Application sidebar ==>`}</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>

            <Text>Arma 3 Contributor Publisher</Text>
          </div>
        </Header>
      }
    >
      <Routes>
        
        {pages.map((page,index)=>(
          <Route key={index} path={page.path} element={page.component}/>
        ))}
      </Routes>
    </AppShell>  
  );
}