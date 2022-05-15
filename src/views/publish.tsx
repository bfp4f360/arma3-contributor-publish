import React from "react";

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

export default function MainPage() {
  // Form data to validate and initial values
  const form = useForm<{ 
    modChangelogFile: string;
    modAddons: string; 
    modId: number | undefined 
  }>({
    initialValues: { 
      modChangelogFile: '', 
      modAddons: '',
      modId: undefined 
    },
    validate: (values) => ({
      modChangelogFile: values.modChangelogFile.length < 1 ? 'Enter file path to changelog' : null,
      modAddons: values.modAddons.length < 1 ? "Enter file path to addons folder of mod" : null,
      modId:
        values.modId === undefined
          ? 'Please enter Steam Workshop mod ID, found in URL'
          : values.modId < 0
          ? "Pretty sure Steam Workshop mod ID's cant be negative"
          : null,
    }),
  });

  const handleSubmit = (values: typeof form.values) => console.log(values);
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
                <ActionIcon onClick={()=>{console.log("open folder explorer")}}>
                  <Folder />
                </ActionIcon>
              }
            /> 
            
            <TextInput 
              label="Mod Addons Folder" 
              placeholder="..." 
              {...form.getInputProps('modAddons')} 
              rightSection={
                <ActionIcon onClick={()=>{console.log("open folder explorer")}}>
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
              <Button type="submit" color="yellow" variant="outline">Update</Button>
            </Group>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}