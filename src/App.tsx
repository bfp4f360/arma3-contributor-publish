import React from 'react';
import './App.css';

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from '@mui/material/TextField';

interface IFormInput {
  modPath: string;
  modId: string;
  changelogFile: string;
}


const App = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
  };

  return (
    <div className="App" style={{"display":"flex","justifyContent":"center","paddingTop":"10vh"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="column">
          <Stack spacing={2} direction="row">
            <Controller
              name="modId"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField label="Mod Steam ID" {...field} />}
            />
            <Controller
              name="changelogFile"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField label="Change Log File Path" {...field} />}
            />
          </Stack>
          <Controller
            name="modPath"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField label="Mod Addon Folder Path" {...field} />}
          />
          <div style={{"display":"flex","justifyContent":"space-between"}}>
            <Button variant="contained">Publish</Button>
            <Link to="/Settings" style={{"textDecoration":"none"}}>
              <Button variant="contained" color='secondary' disabled>Settings</Button>
            </Link>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default App;