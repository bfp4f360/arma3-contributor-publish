import React, { Ref } from "react";

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

import { useRef } from 'react';
import { open as testOpen} from "@tauri-apps/api/dialog";

import { Command } from '@tauri-apps/api/shell'

const windows = navigator.userAgent.includes('Windows')
let cmd = windows ? 'cmd' : 'sh'

export default function MainPage() {
  // Form data to validate and initial values
  const form = useForm<{ 
    modChangelogFile: string;
    modAddonsPath: string; 
    modId: number | undefined 
  }>({
    initialValues: { 
      modChangelogFile: '', 
      modAddonsPath: '',
      modId: undefined 
    },
    validate: (values) => ({
      modChangelogFile: values.modChangelogFile.length < 1 ? 'Enter file path to changelog' : null,
      modAddonsPath: values.modAddonsPath.length < 1 ? "Enter file path to addons folder of mod" : null,
      modId:
        values.modId === undefined
          ? 'Please enter Steam Workshop mod ID, found in URL'
          : values.modId < 0
          ? "Pretty sure Steam Workshop mod ID's cant be negative"
          : null,
    }),
  });

  const handleSubmit = async (values: typeof form.values) => {
    // console.log(values)
    // let commandExample = `D:\\SteamLibrary\\steamapps\\common\\Arma 3 Tools\\Publisher\\PublisherCmd.exe update /id:${values.modId} /changeNoteFile:"${values.modChangelogFile}" /path:"${values.modAddonsPath}" [/nologo] [/nosummary]`
    // let args = [
    //   "update",
    //   `/id:${values.modId}`,
    //   `/changeNoteFile:"${values.modChangelogFile}"`,
    //   `/path:"${values.modAddonsPath}"`,
    //   "[/nologo] [/nosummary]"
    // ]

    // console.log(commandExample)
    // console.log(args)

    console.log("Executing publish command.....",windows,'cmd',['/C'])
    let executableCommand = new Command('cmd',['/C'])

    let res = await executableCommand.execute();
    console.log("res",res)
  };

  let inputRef:any = React.useRef();

  return (
    <React.Fragment>
      <Container size="xs" px="xs">
        
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <Center>
          <Title order={1}>Update Workshop Mod </Title>
        </Center>
        <Divider my="sm" />

        <Box sx={{ maxWidth: 320 }} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)} >
            <TextInput 
              label="Mod Changelog File" 
              placeholder="..." {...form.getInputProps('modChangelogFile')} 
              rightSection={
                <ActionIcon onClick={
                    async () => {
                      let filePath = await testOpen({
                        multiple:false,
                      })
                      

                      if(!filePath) {return}
                      filePath = filePath as string;

                      form.setFieldValue('modChangelogFile', filePath)
                    }
                  }
                >
                  <Folder />
                </ActionIcon>
              }
            /> 
            
            <TextInput 
              label="Mod Addons Folder" 
              placeholder="..." 
              {...form.getInputProps('modAddonsPath')} 
              rightSection={
                <ActionIcon onClick={
                    async () => {
                      let filePath = await testOpen({
                        multiple:false,
                        directory:true
                      })
                      

                      if(!filePath) {return}
                      filePath = filePath as string;

                      form.setFieldValue('modAddonsPath', filePath)
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
              placeholder="..." {...form.getInputProps('modId')} 
              hideControls = {true}
            />

            <Group position="left" mt="md">
              <Button type="submit" color="yellow" variant="outline" onClick={()=>handleSubmit({ 
      modChangelogFile: '', 
      modAddonsPath: '',
      modId: undefined 
    })}>Update</Button>
            </Group>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}