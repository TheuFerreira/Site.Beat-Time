import Login from './login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Context from './Context/Context';
import Home from './home/Home';

function AppPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

function App() {

  const [user, setUser] = useState({});

  return (
    <Context.Provider value={[user, setUser]}>
      { Object.keys(user).length === 0 ? <Login/> : <AppPages/> }
    </Context.Provider>
  );

  
}

export default App;
