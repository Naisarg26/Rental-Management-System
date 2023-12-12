import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../../client/components/Header2/Header2";
import { UserContext } from "../UserContext";

import axios from "axios";
// design
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../api/user";	
// form states
const Login=()=>{
		const navigate=useNavigate();
//		const { user, setUser,setOTP } = useContext(UserContext);
		const { setOTP } = useContext(UserContext);
		const [user, setUser] = useState(null);

	const [email, setEmail] = useState("");
// 	const { setEmail: setRecoveryEmail, setPage, email, setOTP } = useContext(RecoveryContext);
// // ...
// const [userEmail, setUserEmail] = useState("");

	const [password, setPassword] = useState("");
	// const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
	const [showPassword, setShowPassword] = useState(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		console.log("start");

		try {
			console.log("try");
			const res = await login({ email, password });
			console.log(res);
			console.log("before 1");

			if (res.error) toast.error(res.error);
			else {
				console.log("before success");
				toast.success(res.message);
				console.log("after suc");
				setUser(res.username);
				console.log("before navig");
				// After successful login
				const userLocalStorage = {
					"result": {
						"email": email,
						"name": res.username,
						"givenName": res.username,
						"familyName": res.username
					}
				};
				window.localStorage.setItem("profile",JSON.stringify(userLocalStorage));

				console.log("before");
				// redirect the user to home
				navigate("/");
				console.log("after");
				

			}
		} catch (err) {
			toast.error(err);
		}
	};
	function navigateToOtp() {
		if (email) {
		  const OTP = Math.floor(Math.random() * 9000 + 1000);
		  console.log(OTP);
		  setOTP(OTP);
	
		  axios
			.post("http://localhost:8080/send_recovery_email", {
			  OTP,
			  recipient_email: email,
			})
			.then(() => {
				// Use the navigate function to redirect to the OTP input page
				navigate("/otp");
			  })
			  .catch(console.log);
		  return;
		}
		return alert("Please enter your email");
	  }
	
	return (
		<div>
      <Header type="list"/>
	  
		<div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
			<div className="text-center mb-5 alert alert-primary">
				<label htmlFor="" className="h2">
					Login
				</label>
			</div>

			<div className="form-group">
				<TextField
					size="small"
					variant="outlined"
					className="form-control"
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<FormControl
					variant="outlined"
					size="small"
					className="form-control"
				>
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						label="Password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment>
								<IconButton
									edge="end"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<VisibilityIcon />
									) : (
										<VisibilityOffIcon />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</div>

			<div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={!email || !password}
					onClick={handleLogin}
				>
					Submit
				</Button>
			</div>
			<p className="forgot-password text-right">
			<a
                    href="#"
                    onClick={() => navigateToOtp()}
                    className="text-gray-800"
                  >Forgot password?</a>
        </p>
		</div>
		</div>
	);

                    };
export default Login;
