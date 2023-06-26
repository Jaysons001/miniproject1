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
        </Routes>
      </Auth>
    </div>
  );
}

export default App;
