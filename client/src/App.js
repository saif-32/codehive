import './App.css';
import './styles/styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/font-awesome.css';
import './styles/bootstrap-social.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from './pages/home';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Discover } from './pages/discover';
import { Profile } from './pages/profile';
import { Footer } from "./components/footer"
import { VerifyEmail } from "./pages/verifyEmail"
import { EmailSent } from './pages/emailSent';
import { AuthError } from './pages/authError';
import { ForgotPassword } from './pages/forgotPassword';
import { ChangePassword } from './pages/changeP'

function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/email-sent' element={<EmailSent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/register/autherror' element={<AuthError />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/verify-email/:username/:token' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/change-password/:username/:token' element={<ChangePassword />} />
      </Routes>
        <Footer />
    </Router>
  </div>
  )
}

export default App;
