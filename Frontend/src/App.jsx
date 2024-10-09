import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import AllBooks from "./Pages/AllBooks";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ViewBookDetais from "./Components/ViewBookDetails/ViewBookDetais";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";
import { useEffect } from "react";
import Favourites from "./Components/Profile/Favourites";
import UserOrderHistory from "./Components/Profile/UserOrderHistory";
import Settings from "./Components/Profile/Settings";
import AllOrder from "./Pages/AllOrder";
import AddBook from "./Pages/AddBook";
import UpdateBook from "./Pages/UpdateBook";
import DeleteAllOrder from "./Pages/DeleteAllOrder";
function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {/* Use path without "/" for nested routes */}
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrder />} />
          )}
          <Route path="add-book" element={<AddBook />} />
          <Route path="delete-all-order" element={<DeleteAllOrder/>}/>
          <Route path="orderhistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetais />} />
        <Route path="updatebook/:id" element={<UpdateBook />} />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
