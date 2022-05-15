// Component views
import MainPage from "../routes/main"
import SettingsPage from "../routes/settings"

// Icons
import { Settings,Upload } from 'tabler-icons-react';

export const views = [
    {
        displayName: "Publish",
        path:"/",
        leftIcon: <Upload />,
        component: <MainPage />,
        color: 'indigo'
    },
    {
        displayName: "Settings",
        path:"/settings",
        leftIcon: <Settings />,
        component: <SettingsPage />,
        color:'yellow'
    }
]