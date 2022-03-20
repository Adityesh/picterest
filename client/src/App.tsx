import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthIndex from "./components/pages/Auth/Index";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import NotFound from "./components/pages/NotFound/Index";
import NavBar from "./components/ui/Nav/Index";
import './globals.scss';

const App : React.FC = () => {
  return (
    <div className="App">
      <NavBar/>
      
      <Router>
        <Routes>
          <Route path="/auth">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/about" element={<div>About COmponent</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
