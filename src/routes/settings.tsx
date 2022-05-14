import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Settings() {
    return (
        <div className="App">
			<header className="App-header">
            <Link to="/">
                <Button variant="contained">Main</Button>
            </Link>
            <p>Settings Page</p>
			</header>
		</div>
    );
}