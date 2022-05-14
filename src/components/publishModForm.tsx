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
  modPath: string;
  modId: string;
  changelogFile: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const PublishModForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
    let {
      changelogFile,
      modId,
      modPath
    } = data;

    console.log(
      `.\PublisherCmd.exe update /id:${modId} /changeNoteFile:"${changelogFile}" /path:"${modPath}" [/nologo] [/nosummary]`
    )
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2} >
          {/* Row 1 */}
          <Grid container item  style={{display:"flex",justifyContent:"center"}}>
            <React.Fragment>
              <Grid item xs={4}>
                <Controller
                  name="modId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField type="number" label="Mod Steam ID" {...field} />}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="changelogFile"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth  label="Change Log File Path" {...field} />}
                />
              </Grid>
            </React.Fragment>
          </Grid>

          {/* row 2 */}
          <Grid container item  style={{display:"flex",justifyContent:"center"}}>
            <React.Fragment>
              <Grid item xs={8} >
                <Controller
                  name="modPath"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth label="Mod Addon Folder Path" {...field} />}
                />
              </Grid>
            </React.Fragment>
          </Grid>

          {/* row 3 */}
          <Grid container item  style={{display:"flex",justifyContent:"center"}}>
            <React.Fragment>
              <Grid item xs={8} style={{display:"flex",justifyContent:'space-between'}}>
                <Button variant="contained" type="submit">Publish</Button>
                <Link to="/Settings" style={{"textDecoration":"none"}}>
                    <Button variant="contained" color='secondary' disabled>Settings</Button>
                </Link>
              </Grid>
            </React.Fragment>
          </Grid>
        </Grid>
      </Box>
    </form>

    
  );
};

export default PublishModForm;