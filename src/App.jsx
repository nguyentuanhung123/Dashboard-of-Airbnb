import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Owners from "./components/Owners";
import Renters from "./components/Renters";
import './App.css'
import Bookings from "./components/Bookings";
import Houses from "./components/Houses";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Owners />} />
          <Route path="owners" element={<Owners />}/>
          <Route path="renters" element={<Renters />}/>
          <Route path="houses" element={<Houses />}/>
          <Route path="bookings" element={<Bookings />}/>
        </Route>
        <Route path="login" element={<div>This is login page</div>}></Route>
      </Routes>
    </Router>
  )
}

export default App
