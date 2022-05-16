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

import { open as testOpen} from "@tauri-apps/api/dialog";

import { Command } from '@tauri-apps/api/shell'

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
    //Create the command we will run to upload mod
    let publisherCmd = 
    `.\\PublisherCmd.exe update /id:${values.modId} /changeNoteFile:${values.modChangelogFile} /path:${values.modAddonsPath} [/nologo] [/nosummary]`

    
    const command = new Command("cmd", ["/C", publisherCmd], { cwd: "D:\\SteamLibrary\\steamapps\\common\\Arma 3 Tools\\Publisher"  })
    
    command.on('close', data => {
      console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    })
    command.on('error', error => console.log(`command error: "${error}"`))
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`))
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`))
    
    let result = await command.execute()
    console.log(result)
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
              <Button type="submit" color="yellow" variant="outline">
                Update
              </Button>
            </Group>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}