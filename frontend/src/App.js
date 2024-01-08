import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/usercontext";
import Home from "./pages/Homepage";
import Login from "./pages/Loginpage";
import PrivateRoute from "./pages/PrivateRoutepage";
import Signup from "./pages/Signuppage";
import Admin from "./pages/AdminPage";
import AdminBikes from "./pages/AdminBikes";
import AdminUsers from "./pages/AdminUsers"

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <Routes>
          {/* <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} /> */}
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          {/* <Route element={<PrivateRoute />}> */}
            <Route exact path="/" element={<Admin />} />
            {/* <Route exact path="/home" element={<Home />} /> */}
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/admin-bikes" element={<AdminBikes />} />
            <Route exact path="/admin-users" element={<AdminUsers />} />
          {/* </Route> */}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
