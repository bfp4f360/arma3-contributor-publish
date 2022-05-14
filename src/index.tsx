import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
	BrowserRouter,
	Routes,
  	Route,
} from "react-router-dom";
import Settings from './routes/settings';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from "./theme/theme";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
		<CssBaseline/>
		<BrowserRouter>
			<Routes>
			<Route path="/" element=
				{
					<App />
				} 
			/>
			<Route path="settings" element= 
				{
					<Settings />
				} 
			/>
			</Routes>
			
		</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
