import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Discover } from './pages/discover';
import { Profile } from './pages/profile';
import { Navbar } from "./components/navbar"

function App() {
  return (
  <div className="App">
    <Router>
        <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/discover' element={<Discover />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App;
