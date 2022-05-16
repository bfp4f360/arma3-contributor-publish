import React, { useEffect , useContext, useState } from "react";

// To center the contents
import { Container } from '@mantine/core';

// Forms
import { TextInput, NumberInput, Button, Group, Box, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';

// Buttons
import { ActionIcon } from '@mantine/core';
import { Folder } from 'tabler-icons-react';

import { Title } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Center } from '@mantine/core';

import { open as fileExplorerOpen} from "@tauri-apps/api/dialog";

import { Command } from '@tauri-apps/api/shell'

import {ProjectContext} from '../data/context'

export default function MainPage() {
  let {presetData,setPresetData} = (useContext(ProjectContext));

  const [visible, setVisible] = useState(false);
  
  // Form data to validate and initial values
  const initialValues = { 
    presetName:       presetData?.selectedPreset?.presetName       ? presetData?.selectedPreset?.presetName: "",
    modChangelogFile: presetData?.selectedPreset?.modChangelogFile ? presetData?.selectedPreset?.modChangelogFile: "", 
    modFolderPath:    presetData?.selectedPreset?.modFolderPath    ? presetData?.selectedPreset?.modFolderPath: "",
    modId:            presetData?.selectedPreset?.modId            ? presetData?.selectedPreset?.modId: undefined 
  };
  // const initialValues = { 
  //   presetName:       "",
  //   modChangelogFile: "", 
  //   modFolderPath:    "",
  //   modId:            undefined 
  // };

  const formData = useForm<{ 
    presetName: string;
    modChangelogFile: string;
    modFolderPath: string; 
    modId: number | undefined 
  }>({
    initialValues: initialValues,
    validate: (values) => ({
      modChangelogFile: values.modChangelogFile.length < 1 ? 'Enter file path to changelog' : null,
      modFolderPath: values.modFolderPath.length < 1 ? "Enter file path to addons folder of mod" : null,
      modId:
        values.modId === undefined
          ? 'Please enter Steam Workshop mod ID, found in URL'
          : values.modId < 0
          ? "Pretty sure Steam Workshop mod ID's cant be negative"
          : null,
    }),
  });
  
  //console.log(presetData.selectedPreset.presetName,' vs ',formData.getInputProps("presetName").value)

  const handleSubmit = async (values: typeof formData.values) => {
    //Create the command we will run to upload mod
    //@TODO: Have settings and persistent storage working.
    let publisherCmd = 
    `.\\PublisherCmd.exe update /id:${values.modId} /changeNoteFile:${values.modChangelogFile} /path:${values.modFolderPath} [/nologo] [/nosummary]`

    
    const command = new Command("cmd", ["/C", publisherCmd], { cwd: "D:\\SteamLibrary\\steamapps\\common\\Arma 3 Tools\\Publisher"  })
    
    command.on('close', data => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
      setVisible(false)
    })
    command.on('error', error => {
      console.log(`command error: "${error}"`) 
      setVisible(false)
    })
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`))
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`))
    
    setVisible(true)
    let result = await command.execute()
    setVisible(false)
    //console.log(result)
  };

  const handleSave = () => {
    let keys = Object.keys(initialValues);
    let saveData:any = initialValues

    keys.forEach((key:any)=>{
      saveData[key] = formData.getInputProps(key)
    })
    console.log('Saving data: ',saveData)
  }

  useEffect(() => {
    let keys = Object.keys(presetData.selectedPreset);

    keys.forEach((key:any)=>{
      let typedKey = key as keyof typeof presetData.selectedPreset
      formData.setFieldValue(key,presetData.selectedPreset[typedKey])
    })

  }, [presetData])

  return (
    <React.Fragment>
      <Container size="xs" px="xs">
        
      <Box sx={{ maxWidth: 400 }} mx="auto">
        
        <Center>
          <Title order={1}>Update Workshop Mod </Title>
        </Center>
        <Divider my="sm" />

        <Box sx={{ maxWidth: 320 }} mx="auto">
          <LoadingOverlay visible={visible} />
          <form onSubmit={formData.onSubmit(handleSubmit)} >
            <TextInput 
              label="Preset" 
              placeholder="..." {...formData.getInputProps('presetName')} 
            /> 
            <TextInput 
              label="Mod Changelog File" 
              placeholder="..." {...formData.getInputProps('modChangelogFile')} 
              rightSection={
                <ActionIcon onClick={
                    async () => {
                      let filePath = await fileExplorerOpen({
                        multiple:false,
                      })
                      if(!filePath) {return}
                      filePath = filePath as string;

                      formData.setFieldValue('modChangelogFile', filePath)
                    }
                  }
                >
                  <Folder />
                </ActionIcon>
              }
            /> 
            
            <TextInput 
              label="Mod Folder" 
              placeholder="..." 
              {...formData.getInputProps('modFolderPath')} 
              rightSection={
                <ActionIcon onClick={
                    async () => {
                      let filePath = await fileExplorerOpen({
                        multiple:false,
                        directory:true
                      })
                      

                      if(!filePath) {return}
                      filePath = filePath as string;

                      formData.setFieldValue('modFolderPath', filePath)
                    }
                  }
                >
                  <Folder />
                </ActionIcon>
              }
            />
            <NumberInput 
              mt="sm" 
              label="Mod Steam Workshop ID" 
              placeholder="..." {...formData.getInputProps('modId')} 
              hideControls = {true}
            />

            <div>
              <Group position="apart" mt="md">
                <Group position="left" mt="md">
                  <Button type="submit" color="yellow" variant="outline">
                    Update
                  </Button>
                </Group>
                <Group position="right" mt="md">
                  <Button color="green" variant="outline" onClick={handleSave}>
                    Save as Preset
                  </Button>
              </Group>
              </Group>
              
            </div>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}