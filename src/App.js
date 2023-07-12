import React from 'react';
import { AppProvider } from './Components/Context';
import Home from './Components/Home';

function App() {
  return(
    <AppProvider>
      <Home />
    </AppProvider>
  )
}

export default App;
