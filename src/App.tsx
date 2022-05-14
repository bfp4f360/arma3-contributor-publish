import React from 'react';
import './App.css';

import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import PublishModForm from './components/publishModForm';


export default function App() {
  return (
    <React.Fragment>
      <div style={{display:'flex',alignItems:'center',justifyContent:"center","paddingTop":"10vh"}}>
        <PublishModForm/>
      </div>
      
    {/* <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
      <Grid item lg={1}>
        <PublishModForm/>
      </Grid> */}
      {/* <Grid item lg={3}>
        <PublishModForm/>
      </Grid> */}
    {/* </Grid> */}
    
    </React.Fragment>
  )
}