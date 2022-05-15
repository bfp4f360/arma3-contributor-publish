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

export default function SettingsPage() {
  // Form data to validate and initial values
  const form = useForm<{ 
    arma3ToolsLocation: string;
  }>({
    initialValues: { 
      arma3ToolsLocation: '', 
    },
    validate: (values) => ({
      arma3ToolsLocation: values.arma3ToolsLocation.length < 1 ? 'Enter file path to changelog' : null,
    }),
  });

  const handleSubmit = (values: typeof form.values) => console.log(values);
  return (
    <React.Fragment>
      <Container size="xs" px="xs">
        
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <Center>
        <Title order={1} >Settings</Title>
        </Center>
        <Divider my="sm" />

        <Box sx={{ maxWidth: 320 }} mx="auto">
          <form onSubmit={form.onSubmit(handleSubmit)} >
            <TextInput 
              label="Arma 3 Tools Location" 
              placeholder="..." {...form.getInputProps('arma3ToolsLocation')} 
              rightSection={
                <ActionIcon onClick={()=>{console.log("open folder explorer")}}>
                  <Folder />
                </ActionIcon>
              }
            /> 
            <Group position="left" mt="md">
              <Button type="submit" color="green" variant="outline">Save</Button>
            </Group>
          </form>
        </Box>

        <Divider my="sm" />
      </Box>
      </Container>
    </React.Fragment>
  );
}