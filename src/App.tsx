import React from 'react';
import './App.css';

import PublishModForm from './components/publishModForm';
import CommandOutput from './components/commandOutput';

export default function App() {
  return (
    <React.Fragment>
      <div style={{display:'flex',alignItems:'center',justifyContent:"center","paddingTop":"10vh"}}>
        <PublishModForm/>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:"center","paddingTop":"10vh"}}>
        <CommandOutput/>
      </div>
    </React.Fragment>
  )
}