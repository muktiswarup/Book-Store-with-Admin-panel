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
import ViewBookDetais from './Components/ViewBookDetails/ViewBookDetais'
function App() {
  

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route  path='/all-books' element={<AllBooks/>}/>
            <Route  path='/cart' element={<Cart/>}/>
            <Route  path='/profile' element={<Profile/>}/>
            <Route  path='/signin' element={<SignIn/>}/>
            <Route  path='/signup' element={<SignUp/>}/>
            <Route path="/view-book-details/:id" element={<ViewBookDetais />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  )
}

export default App
