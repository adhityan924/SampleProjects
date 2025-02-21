import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ResumeAnalyzer from './components/ResumeAnalyzer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResumeAnalyzer />
    </ThemeProvider>
  );
}

export default App;
