import React, { useState, Dispatch } from 'react'
import { BaseDirectory, createDir, readTextFile, writeFile } from "@tauri-apps/api/fs";

const APP_DATA_DIR = BaseDirectory.App
const APP_DATA_JSON = "presets.json";
const APP_SETTINGS_JSON = "settings.json";

const app_constants = {
    APP_DATA_DIR,
    APP_DATA_JSON,
    APP_SETTINGS_JSON
}

// Functions to read/write data
const createDataFolder = async () => {
  try {
    let res = await createDir("tauri_folder", {
      dir: APP_DATA_DIR,
      recursive: true,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const saveDataFile = async (contents: Object, path: string) => {
    try {
      await writeFile(
        {
          contents: JSON.stringify(contents),
          path: path,
        },
        {
          dir: APP_DATA_DIR,
        }
      );
    } catch (e) {
      console.log(e);
    }
};

const readDataFile:any = async (path: string) => {
    try {
        let res = await readTextFile(path, {
            dir: APP_DATA_DIR,
        });
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}

// Preset Data
interface IPresetData {
    selectedPreset: {
        presetName: string;
        modChangelogFile: string;
        modFolderPath: string;
        modId: number;
    };
    savedPresets: {
        presetName: string;
        modChangelogFile: string;
        modFolderPath: string;
        modId: number;
    }[]
}
let DefaultData:IPresetData = {
    selectedPreset: {
        presetName: '',
        modChangelogFile: '',
        modFolderPath: '',
        modId: 0
    },
    savedPresets: []
}


// Settings Data 
interface ISettingsData {
  arma3ToolsPath : string
}
let DefaultSettings = {
  arma3ToolsPath : ''
}

// Create context
const ProjectContext = 
React.createContext<{
    presetData: typeof DefaultData
    setPresetData:React.Dispatch<React.SetStateAction<typeof DefaultData>>
    settingsData: typeof DefaultSettings
    setSettingsData:React.Dispatch<React.SetStateAction<typeof DefaultSettings>>
} >({
    presetData:DefaultData,
    setPresetData: ()=>{},
    settingsData: DefaultSettings,
    setSettingsData: ()=>{}
})

export {
    app_constants,
    ProjectContext,
    DefaultData,
    DefaultSettings,
    createDataFolder,
    saveDataFile,
    readDataFile
}
