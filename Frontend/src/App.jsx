import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import AllBooks from './Pages/AllBooks'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
function App() {
  

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/all-books' element={<AllBooks/>}/>
            <Route exact path='/cart' element={<Cart/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/signin' element={<SignIn/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  )
}

export default App
