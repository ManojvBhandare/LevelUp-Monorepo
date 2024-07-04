import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ReadSection } from "./ReadSection";
import Article from "./components/article";
import { Analytics } from "./pages/Analytics";
import HomePage from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import Outlet from "./pages/Outlet";
import { UserLogin } from "./pages/UserLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />

        {/* Routes that should include the NavBar */}
        <Route element={<Outlet />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/read" element={<ReadSection />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
