import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
    </div>
  );
}

export default App;
