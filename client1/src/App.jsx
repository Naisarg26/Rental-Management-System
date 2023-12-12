//App.jsx
import React, {useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { gapi } from "gapi-script";
import { createContext } from "react";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./api/user";

// components
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import OTPInput from "./pages/OTPInput";
import Recovered from "./pages/Recovered";
import Reset from "./pages/Reset";
import MaintenancePage from "./pages/complaint/Maintenance";
import MaintenanceRequestForm from './pages/complaint/MaintenanceRequestForm';
import MaintenanceHistory from "./pages/complaint/MaintenanceHist";

// export const RecoveryContext = createContext();
gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId:
      "245462958761-9m9ju5sa7rbh6fvljd8u454j85q6oboi.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});

const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
	useEffect(() => {
		const unsubscribe = getUser()
			.then((res) => {
				if (res.error) toast(res.error);
				else setUser(res.username);
			})
			.catch((err) => toast(err));

		return () => unsubscribe;
	}, []);
  // function NavigateComponents() {
  //   if (page === "login") return <Login />;
  //   if (page === "otp") return <OTPInput />;
  //   if (page === "reset") return <Reset />;

  //   return <Recovered />;
  // }

  return (
    <div>

      <Router>
      {/* <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
       */}
        <UserContext.Provider value={{ page, setPage, otp, setOTP, setEmail, email }}>
					<ToastContainer />
					<Header />
          
          
        <Routes>
          
          <Route exact path="/" element={<Home />} />
          <Route path="/otp" element={<OTPInput />} />
          <Route path ="/reset" element={<Reset/>}/>
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/hotels" element={<List/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/recovered" element={<Recovered />} />
          <Route path="/Maintenance" element={<MaintenancePage />} />
          <Route path="/maintenance-request" element={<MaintenanceRequestForm />} />
          <Route path="/maintenance-hist" element={<MaintenanceHistory />}/>
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
