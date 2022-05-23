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
import { Code } from '@mantine/core';
import { Command } from '@tauri-apps/api/shell'
import { Loader } from '@mantine/core';

import {ProjectContext,DefaultData,saveDataFile,readDataFile,app_constants} from '../data/context'



export default function MainPage() {
  let {presetData,setPresetData} = (useContext(ProjectContext));

  let [consoleOutput, setConsoleOutput] = (useState([{
    text:"",
    color:""
  }]))
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
      presetName: values.presetName.length < 1 ? 'Enter preset name' : null,
      modChangelogFile: values.modChangelogFile.length < 1 ? 'Enter file path to changelog' : null,
      modFolderPath: values.modFolderPath.length < 1 ? "Enter file path to addons folder of mod" : null,
      modId:
        values.modId === undefined
          ? 'Please enter Steam Workshop mod ID, found in URL'
          : values.modId < 1
          ? "Pretty sure Steam Workshop mod ID cant be 0 or less"
          : null,
    }),
  });
  
  //console.log(presetData.selectedPreset.presetName,' vs ',formData.getInputProps("presetName").value)

  const handleSubmit = async (values: typeof formData.values) => {
    consoleOutput = [{
      text:"",
      color:""
    }]
    setConsoleOutput(consoleOutput)

    // return
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
    command.stdout.on('data',   (line) => {
      let newLine = {
        text:`"${line}"`,
        color:"gray"
      } 
      RenderNewOutput(newLine)
      consoleOutput.push(newLine)
    })
    command.stderr.on('data', (line) => {
      let newLine = {
        text:`"${line}"`,
        color:"red"
      } 
      RenderNewOutput(newLine)
      consoleOutput.push(newLine)
    })
    
    setVisible(true)
    let result = await command.execute()
    setVisible(false)
    //console.log(result)
  };

  function RenderNewOutput(newLine:any) {
    setConsoleOutput([
      ...consoleOutput,
      newLine
    ])
  }
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
      //console.log('Saving data: ',saveData)

      //Save the data
      let currentData = JSON.parse(await readDataFile(app_constants.APP_DATA_JSON)) as typeof DefaultData 

      //see if new or update
      let matchName = (saveData as typeof initialValues).presetName;
      //let matchId = (saveData as typeof initialValues).modId;
      const findPresetToDelete = (preset: typeof presetData.savedPresets[number]) => 
      (preset.presetName == matchName);
      let index = presetData.savedPresets.findIndex(findPresetToDelete)

      if(index == -1 ) {
        currentData.savedPresets.push(saveData);
      } else {
        currentData.savedPresets.splice(index,1,saveData)
      }
      
      currentData.selectedPreset = saveData;
      saveDataFile(currentData,app_constants.APP_DATA_JSON)
      setPresetData(currentData)

    } catch (e) {
      console.error(e);
      saveDataFile(DefaultData,app_constants.APP_DATA_JSON) // Reset just incase?
    }
  }

  const handleDelete = async() => {
    let matchName = presetData.selectedPreset.presetName;
    let matchId = presetData.selectedPreset.modId;
    
    const findPresetToDelete = (preset: typeof presetData.savedPresets[number]) => 
    (preset.presetName == matchName) && (preset.modId == matchId);

    let index = presetData.savedPresets.findIndex(findPresetToDelete)

    if(index >= 0) {
      let currentData = JSON.parse(await readDataFile(app_constants.APP_DATA_JSON)) as typeof DefaultData
      currentData.savedPresets.splice(index,1)

      // if(currentData.savedPresets.length > 0) {
      //   currentData.selectedPreset = currentData.savedPresets[0]
      // } else {
      //   currentData.selectedPreset = DefaultData.selectedPreset //resets the form
      // }
      currentData.selectedPreset = DefaultData.selectedPreset //resets the form
      saveDataFile(currentData,app_constants.APP_DATA_JSON)
      setPresetData(currentData)

    }
  }

  useEffect(() => {
    let keys = Object.keys(presetData.selectedPreset);

    keys.forEach((key:any)=>{
      let typedKey = key as keyof typeof presetData.selectedPreset
      formData.setFieldValue(key,presetData.selectedPreset[typedKey])
    })

  }, [presetData])

  function getConsoleOutputBody() {
    //console.log("Gen body",consoleOutput)
    if(consoleOutput.length == 1 && consoleOutput[0].text == "") {
      return (
        <Code color="yellow">
          Publisher Output...
        </Code>
      )
    }
    return (
      <React.Fragment>
        {
          consoleOutput.map((val,index) => <div key={index}><Code color={val.color}>{val.text}</Code></div>)
          // consoleOutput.map((line,index)=>{
          //   <Code color={line.color}>{line.text}</Code>
          // })
        }
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Container size="xs" px="xs">
        
      <Box sx={{ maxWidth: 400 }} mx="auto">
        
        <Center>
          <Title order={1}>Update Workshop Mod </Title>
        </Center>
        <Divider my="sm" />

        <Box mx="auto">
          
          <form onSubmit={formData.onSubmit(handleSubmit)} >
            {/* <LoadingOverlay visible={visible}/> */}
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

            {/* buttons */}
            <div>
              <Group position="apart" mt="xs">
                <Group position="left" mt="xs">
                  <Button 
                    type="submit" color="yellow" variant="outline" disabled={visible}
                    leftIcon={ visible? <Loader size="sm"/>: null}
                    compact
                  >
                    Update
                  </Button>
                </Group>
                <Group position="center" mt="xs">
                  <Button 
                    color="green" variant="outline" onClick={handleSave} disabled={visible}
                    leftIcon={ visible? <Loader size="sm"/>: null}
                    compact
                  >
                    Save Preset
                  </Button>
                </Group>
                <Group position="right" mt="xs">
                  <Button 
                    color="red" variant="outline" onClick={handleDelete} disabled={visible}
                    leftIcon={ visible? <Loader size="sm"/>: null}
                    compact
                  >
                    Delete Preset
                  </Button>
                </Group>
               
              </Group>
              
            </div>
          </form>
        </Box>

        <Divider my="sm" />
        <Code block>{
          getConsoleOutputBody()
        }</Code>
      </Box>
      </Container>
    </React.Fragment>
  );
}