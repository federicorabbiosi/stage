import { useEffect } from 'react';
import './App.css';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';

function App() {

  useEffect(() => {
  }, [])

  return (
    <div className="App">
      <SearchAppBar />
      <Box sx={{paddingTop: '60px'}}>
        <Outlet />
      </Box>
    </div>
  );
}

export default App;
