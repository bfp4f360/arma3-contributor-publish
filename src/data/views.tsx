// Component views
import MainPage from "../views/publish"
import SettingsPage from "../views/settings"

// Icons
import { Settings,Upload } from 'tabler-icons-react';

export const views: viewType[] = [
    {
        displayName: "Publish",
        path:"/views/publish",
        leftIcon: <Upload />,
        component: <MainPage />,
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
    color: string;
}