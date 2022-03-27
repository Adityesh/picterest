import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Homepage from "./components/pages/Homepage/Index";
import NotFound from "./components/pages/NotFound/Index";
import './globals.scss';

const App : React.FC = () => {
  return (
    <div className="App">      
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
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
