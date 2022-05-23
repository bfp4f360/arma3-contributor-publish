import React, { useContext, useEffect } from "react";

//file explorer
import { open as fileExplorerOpen} from "@tauri-apps/api/dialog";

// To center the contents
import { Container } from '@mantine/core';

// Forms
import { TextInput, NumberInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

// Buttons
import { ActionIcon } from '@mantine/core';
import { Folder } from 'tabler-icons-react';

import { Title } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Center } from '@mantine/core';
import { app_constants, ProjectContext, readDataFile,DefaultSettings, saveDataFile } from "../data/context";

export default function SettingsPage() {
  // Context
  let {settingsData,setSettingsData} = (useContext(ProjectContext));
  
  // Form data to validate and initial values
  const initialValues = { 
    arma3ToolsPath: '', 
  }

  const formData = useForm<{ 
    arma3ToolsPath: string;
  }>({
    initialValues: initialValues,
    validate: (values) => ({
      arma3ToolsPath: values.arma3ToolsPath.length < 1 ? 'Enter folder path to Arma 3 Tools' : null,
    }),
  });

  useEffect(() => {
    let keys = Object.keys(initialValues);

    keys.forEach((key:any)=>{
      let typedKey = key as keyof typeof settingsData //ts stuff lol
      formData.setFieldValue(key,settingsData[typedKey])
    })

  }, [settingsData])
  
  const handleSubmit = (values: typeof formData.values) => console.log(values);
  const handleSave = async () => {
    try {
      // First validate
      let validationRes = formData.validate();
      if(validationRes.hasErrors) {
        throw validationRes
      }

      // Get the data
      let keys = Object.keys(initialValues);
      let saveData:any = initialValues

      keys.forEach((key:any)=>{
        saveData[key] = formData.getInputProps(key).value
      })
      console.log('Saving data: ',saveData)

      //get existing data
      //let currentData = JSON.parse(await readDataFile(app_constants.APP_SETTINGS_JSON)) as typeof DefaultSettings 

      saveDataFile(saveData,app_constants.APP_SETTINGS_JSON)
      setSettingsData(saveData)

    } catch (e) {
      console.error(e);
      saveDataFile(DefaultSettings,app_constants.APP_SETTINGS_JSON) // Reset just incase?
    }
  }

  return (
    <React.Fragment>
      <Container size="xs" px="xs">
        
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <Center>
        <Title order={1} >Settings</Title>
        </Center>
        <Divider my="sm" />

        <Box sx={{ maxWidth: 320 }} mx="auto">
          <form onSubmit={formData.onSubmit(handleSubmit)} >
            <TextInput 
              label="Arma 3 Tools Location" 
              placeholder="..." {...formData.getInputProps('arma3ToolsPath')} 
              rightSection={
                <ActionIcon onClick={
                    async () => {
                      let filePath = await fileExplorerOpen({
                        multiple:false,
                        directory:true
                      })
                      if(!filePath) {return}
                      filePath = filePath as string;

                      formData.setFieldValue('arma3ToolsPath', filePath)
                    }
                  }
                >
                  <Folder />
                </ActionIcon>
              }
            /> 
            <Group position="left" mt="md">
              <Button onClick={handleSave} type="submit" color="green" variant="outline">Save</Button>
            </Group>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}