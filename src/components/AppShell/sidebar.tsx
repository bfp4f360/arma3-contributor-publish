import {viewType} from '../../data/views'
import React from "react";
import { Route, Routes } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';

type propsType = {
  views?: viewType[]
}
export default function SideBar(props: propsType) {
  let {
    views = []
  } = props;

  return (
    <React.Fragment>
        <ScrollArea>
        <Routes>
            {views.map((view,index)=>(
                view.sidebarComponent ? 
                <Route key={index} path={view.path} element={view.sidebarComponent}/>
                :
                <></>
            ))}
        </Routes>
        </ScrollArea>
    </React.Fragment>        
  )
}