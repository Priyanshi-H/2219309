// File: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css'; // Optional styling file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

// File: src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

// File: src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'));

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', username);
      setUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// File: src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please enter both fields!');
      return;
    }

    if (login(username, password)) {
      navigate('/');
    } else {
      alert('Incorrect login details');
    }
  };

  return (
    <Box sx={{ mt: 8, mx: 'auto', maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;

// File: src/pages/Home.js
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Shortener from '../components/Shortener';
import ClickStats from '../components/ClickStats';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { logout, user } = useAuth();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Hi {user} 👋</Typography>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Shortener />
        <ClickStats />
      </Box>
    </Box>
  );
};

export default Home;

// File: src/components/Shortener.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Shortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = () => {
    if (!url.trim()) {
      alert('Enter a valid URL');
      return;
    }

    const code = Math.random().toString(36).substring(2, 7);
    const short = `http://localhost:3000/${code}`;
    setShortUrl(short);
  };

  return (
    <Box>
      <Typography variant="h6">Enter your URL to shorten:</Typography>
      <TextField
        fullWidth
        sx={{ mt: 1 }}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        label="Paste your long URL"
      />
      <Button sx={{ mt: 2 }} onClick={handleShorten} variant="contained">Shorten</Button>

      {shortUrl && (
        <Box sx={{ mt: 2 }}>
          <Typography>Short URL:</Typography>
          <Typography color="primary">{shortUrl}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Shortener;

// File: src/components/ClickStats.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ClickStats = () => {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    // Simulated click data
    setClicks([
      { source: 'Instagram', timestamp: '2025-07-15 10:20' },
      { source: 'WhatsApp', timestamp: '2025-07-15 11:05' }
    ]);
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Click Stats</Typography>
      {clicks.map((click, i) => (
        <Paper key={i} sx={{ p: 2, mt: 1 }}>
          <Typography>Source: {click.source}</Typography>
          <Typography variant="caption">Time: {click.timestamp}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default ClickStats;


