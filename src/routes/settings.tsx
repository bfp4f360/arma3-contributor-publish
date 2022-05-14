import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import SettingsForm from '../components/settingsForm';

export default function Settings() {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:"center","paddingTop":"10vh"}}>
        <SettingsForm/>
		  </div>
    );
}