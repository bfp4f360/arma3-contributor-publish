import {viewType} from '../../data/views'
import React, { useState } from 'react';
import {
  AppShell,
  Footer,
  Aside,
  Text,
  MediaQuery,
} from '@mantine/core';


import NavbarShell from './navbar'
import Body from './body'
import HeaderShell from './header'

type propsType = {
  views?: viewType[]
}

export default function App(props: propsType) {
  let {views=[]} = props
  const [opened, setOpened] = useState(false);

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
        <HeaderShell opened={opened} setOpened={setOpened}/>
      }
    >
      <Body views={views}/>
    </AppShell>  
  );
}