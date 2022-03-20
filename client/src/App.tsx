import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/ui/Nav/Index";
const App : React.FC = () => {
  return (
    <div className="App">
      <NavBar>
        Hello
      </NavBar>
      
      <Router>
        <Routes>
          <Route path="/" element={<div>Index COmponent</div>} />
          <Route path="/auth" element={<div>Auth Component</div>}>
            <Route path="login" element={<div>Login COmponent</div>} />
            <Route path="register" element={<div>Register COmponent</div>} />
          </Route>
          <Route path="/about" element={<div>About COmponent</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
