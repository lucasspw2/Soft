import 'react-toastify/dist/ReactToastify.css';
import {  ThemeProvider, createTheme, CssBaseline } from '@material-ui/core'  
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import './index.css'


function App() {
   
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1f1f1f'
      },
      secundary: {
        main: '#f2f2c2'
      }
    }
  })
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme} >
      <ToastContainer autoClose={3000} />
      <Routes />
      <CssBaseline />
      </ThemeProvider>
    </BrowserRouter>
  
  )

}
export default App;