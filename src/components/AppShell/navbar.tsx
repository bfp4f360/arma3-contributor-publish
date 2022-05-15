import {viewType} from '../../data/views'
import React from "react";
import {
  Button,
  Navbar,
  ThemeIcon,
} from '@mantine/core';

import {
  Link
} from "react-router-dom";

type propsType = {
  opened?: boolean
  views?: viewType[]
}
export default function NavbarShell(props: propsType) {
  let {
    opened=false,
    views = []
  } = props;

  return (
    <React.Fragment>
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        {views.map((page,index)=>(
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
    </React.Fragment>        
  )
}