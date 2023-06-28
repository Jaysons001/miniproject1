import "./App.css";
import { Navbar } from "./component/navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Verified } from "./pages/verified";
import { Write } from "./pages/write";
import { Kategori } from "./pages/kategori";
import { Post } from "./pages/post";
import Auth from "./component/authentificationToKeepLogin";
import { Profil } from "./pages/profil";
import { ForgotPassword } from "./pages/forgotPassword";
import { AfterForgotPassword } from "./pages/forgotPasswordSetelah";
import { Login } from "./pages/login";
import { Artikelmu } from "./pages/articlemu";
import { Artikelsuka } from "./pages/artikelsuka";
function App() {
  return (
    <div className="App">
      <Auth>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verification/:token" element={<Verified />} />
          <Route
            path="/verification-change-email/:token"
            element={<Verified />}
          />
          <Route path="/write" element={<Write />} />
          <Route path="/kategori/:id" element={<Kategori />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/artikelsuka" element={<Artikelsuka />} />
          <Route
            path="/reset-password/:token"
            element={<AfterForgotPassword />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/artikelmu" element={<Artikelmu />} />
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
