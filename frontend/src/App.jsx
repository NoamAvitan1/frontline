import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import Home from "./features/Home";
import Auth from "./features/Auth";
import './index.css'

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
