import React from 'react';
import '../App.css';

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface IFormInput {
    arma3ToolsPath: string;
}

const SettingsForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2} >
          {/* Row 1 */}
          <Grid container item  style={{display:"flex",justifyContent:"center"}}>
            <React.Fragment>
              <Grid item xs={12}>
                <Controller
                  name="arma3ToolsPath"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth label="Path to Arma 3 Tools" {...field} />}
                />
              </Grid>
            </React.Fragment>
          </Grid>

          {/* row */}
          <Grid container item  style={{display:"flex",justifyContent:"center"}}>
            <React.Fragment>
              <Grid item xs={8} style={{display:"flex",justifyContent:'space-between'}}>
                <Button variant="contained" type="submit">Save</Button>
                <Link to="/" style={{"textDecoration":"none"}}>
                    <Button variant="contained" color='secondary'>Back</Button>
                </Link>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Box>
    </form>

    
  );
};

export default SettingsForm;