// Component views
import MainPage from "../views/publish"
import SettingsPage from "../views/settings"

// Icons
import { Settings,Upload } from 'tabler-icons-react';

import { Chips, Chip } from '@mantine/core';
import React, { useContext } from "react";
import {ProjectContext} from "./context";

function GenView(): JSX.Element {
    let {presetData,setPresetData} = (useContext(ProjectContext));
    if(presetData?.savedPresets.length == 0) {
        return (
            <React.Fragment>
                
            </React.Fragment>
        )
    }
    return (
        <Chips 
            color="blue" 
            variant="outline" 
            defaultValue={presetData?.selectedPreset?.presetName || ""}
            onChange={
                (val)=>{
                    let matched = presetData.savedPresets.find(item => {
                        return item?.presetName == val
                    })
                    if(matched) {
                        setPresetData({
                            savedPresets:presetData.savedPresets,
                            selectedPreset:matched
                        })
                    }
                }
            }
        >
            {presetData.savedPresets.map((val, i) =>
                
                <Chip key={i} value={val.presetName} checked={true}>{val.presetName}</Chip>
            )}
            {/* {[...Array(5)].map((x, i) =>
                <Chip  value={`Preset-${i}`}>Preset #{i}</Chip>
            )} */}
        </Chips>
    )

}

export const views: viewType[] = [
    {
        displayName: "Publish",
        path:"/",
        leftIcon: <Upload />,
        component: <MainPage />,
        sidebarComponent: <GenView/>,
        color: 'yellow'
    },
    {
        displayName: "Settings",
        path:"/views/settings",
        leftIcon: <Settings />,
        component: <SettingsPage />,
        color:'green'
    }
]

export interface viewType {
    displayName: string;
    path: string;
    leftIcon: JSX.Element;
    component: JSX.Element;
    sidebarComponent?: JSX.Element;
    color: string;
    
}