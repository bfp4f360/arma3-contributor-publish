import React from 'react';
// import './App.css';

import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function App() {
	return (
		<div className="App">
			<header className="App-header">
            <Link to="/Settings">
                <Button variant="contained">Settings</Button>
            </Link>
            <p>Main Page</p>
			</header>
		</div>
	);
}

export default App;
