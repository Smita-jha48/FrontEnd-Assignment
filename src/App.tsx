import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Landing, Register, Login} from './pages';
import ProtectedRoute from './helpers/ProtectedRoutes';
function App() {

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute> <Landing /></ ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
