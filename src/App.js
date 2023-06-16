import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalenderApp from "./pages/CalenderBooking/CalenderApp";
import HrMetting from "./pages/hrMetting/hrMetting";
import R3Final from "./pages/r3Final/r3Final";
import Home from "./pages/Homepage/Home";
import { ExpertHome } from "./pages/expertHome/expertHome";
import { ExpertMetting } from "./pages/expertMetting/expertMetting";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>

          <Route
            exact
            path="/calendarDetails"
            element={<CalenderApp />}
          ></Route>
          <Route exact path="/hrMetting" element={<HrMetting />}></Route>
          <Route exact path="/roundFinal" element={<R3Final />}></Route>
          <Route exact path="/expertHome" element={<ExpertHome />}></Route>
          <Route
            exact
            path="/expertMetting"
            element={<ExpertMetting />}
          ></Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
