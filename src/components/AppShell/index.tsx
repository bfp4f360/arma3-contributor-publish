import {viewType} from '../../data/views'
import React, { useContext, useState } from 'react';
import {
  AppShell,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Title,
} from '@mantine/core';


import NavbarShell from './navbar'
import Body from './body'
import HeaderShell from './header'
import SideBar from './sidebar'
import { ProjectContext } from '../../data/context';

type propsType = {
  views?: viewType[]
}

export default function App(props: propsType) {
  let {views=[]} = props
  const [opened, setOpened] = useState(false);
  let {presetData,setPresetData} = (useContext(ProjectContext));
  
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <NavbarShell views={views} opened={opened}/>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            {/* <Text>{`Application sidebar ==>`}</Text> */}
            <SideBar views={views}/>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
         <Title order={5}><Text color="blue" inherit component="span">{presetData.selectedPreset.presetName} </Text>Publisher Preset Selected</Title>
        </Footer>
      }
      header={
        <HeaderShell opened={opened} setOpened={setOpened}/>
      }
    >
      <Body views={views}/>
    </AppShell>  
  );
}