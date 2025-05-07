import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Login />} />
        </Routes>
    </UserProvider>
  );
}

export default App;
