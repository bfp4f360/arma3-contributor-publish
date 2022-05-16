import React, { useState, Dispatch } from 'react'

//@TODO: Have settings and persistent storage working.
let DefaultData = {
    "selectedPreset":{
        presetName: 'Dev Mod',
        modChangelogFile: 'C:\\Users\\namenai\\Desktop\\changelog1.txt', 
        modFolderPath: 'C:\\Users\\namenai\\Desktop\\StagingMod',
        modId: 2182968046 
    },
    "savedPresets":[
        {
            presetName: 'Dev Mod',
            modChangelogFile: 'C:\\Users\\namenai\\Desktop\\changelog1.txt', 
            modFolderPath: 'C:\\Users\\namenai\\Desktop\\StagingMod',
            modId: 2182968046 
        },
        {
            presetName: 'Dev Mod2',
            modChangelogFile: 'C:\\Users\\namenai\\Desktop\\changelog2.txt', 
            modFolderPath: 'C:\\Users\\namenai\\Desktop\\StagingMod',
            modId: 2182968046 
        }
    ]
}
const ProjectContext = 
React.createContext<{
    presetData: typeof DefaultData
    setPresetData:React.Dispatch<React.SetStateAction<typeof DefaultData>>
} >({
    presetData:DefaultData,
    setPresetData: ()=>{}
})

// const defaultContext = 

export {
    ProjectContext,
    DefaultData
}
