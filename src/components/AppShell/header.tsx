import React from "react";
import {
    Header,
    Text,
    MediaQuery,
    Burger,
  } from '@mantine/core';

import {
  Routes, Route
} from "react-router-dom";

type propsType = {
  opened?: boolean,
  setOpened?: (isOpen: any) => any
}
export default function Body(props: propsType) {
  let {
    opened = false,
    setOpened = (isOpen: any) => (!isOpen)
  } = props;

  return (
    <React.Fragment>
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o: any) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text>Arma 3 Contributor Publisher</Text>
      </div>
    </Header>
    </React.Fragment>        
  )
}