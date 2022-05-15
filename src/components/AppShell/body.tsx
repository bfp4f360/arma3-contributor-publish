import {viewType} from '../../data/views'
import React from "react";
import {
  Button,
  Navbar,
  ThemeIcon,
} from '@mantine/core';

import {
  Routes, Route
} from "react-router-dom";

type propsType = {
  views?: viewType[]
}
export default function Body(props: propsType) {
  let {
    views = []
  } = props;

  return (
    <React.Fragment>
      <Routes>
        {views.map((page,index)=>(
          <Route key={index} path={page.path} element={page.component}/>
        ))}
      </Routes>
    </React.Fragment>        
  )
}