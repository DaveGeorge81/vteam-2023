import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/AdminPage";
import AdminBikes from "./pages/AdminBikes";
import AdminUsers from "./pages/AdminUsers"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Admin />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/admin-bikes" element={<AdminBikes />} />
            <Route exact path="/admin-users" element={<AdminUsers />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
