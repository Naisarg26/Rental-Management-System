import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
	FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
export default function Reset() {
  const [password, setPassword] = useState("");
  const { email } = useContext(UserContext);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
  let hasSixChar = password.length >= 6;
	let hasLowerChar = /(.*[a-z].*)/.test(password);
	let hasUpperChar = /(.*[A-Z].*)/.test(password);
	let hasNumber = /(.*[0-9].*)/.test(password);
	let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);
    const navigate=useNavigate();
    const changePassword = async () => {
      try {
		const email = window.localStorage.getItem("email");

        // Make an API request to the backend to change the password
        // console.log(email);
        const response = await fetch("http://localhost:8080/server1/users/resetpassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, // Replace with the user's email
            newPassword: password,
          }),
        });
  
        if (response.ok) {
          // Password reset successful, you can navigate to a success page or do something else
          navigate("/login"); // Replace with your desired success route
        } else {
          // Password reset failed, handle the error
          console.error("Password reset failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
			<div className="text-center mb-5 alert alert-primary">
				<label htmlFor="" className="h2">
					Change Password
				</label>
			</div>
            
            <div className="form-group mt-4 space-y-4 lg:mt-5 md:space-y-5">
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
							<InputAdornment position="start">
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
				{password && (
					<div className="ml-1" style={{ columns: 2 }}>
						<div>
							{hasSixChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>at least 6 characters</small>
								</span>
							)}
						</div>
						<div>
							{hasLowerChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one lowercase</small>
								</span>
							)}
						</div>
						<div>
							{hasUpperChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one uppercase</small>
								</span>
							)}
						</div>
						<div>
							{hasNumber ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one number</small>
								</span>
							)}
						</div>
						<div>
							{hasSpecialChar ? (
								<span className="text-success">
									<CheckCircleIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							) : (
								<span className="text-danger">
									<CancelIcon
										className="mr-1"
										fontSize="small"
									/>
									<small>one special symbol</small>
								</span>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="form-group">
				<TextField
					size="small"
					type="password"
					variant="outlined"
					className="form-control"
					label="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{password && confirmPassword && (
					<FormHelperText className="ml-1 mt-1">
						{password === confirmPassword ? (
							<span className="text-success">
								Password does match
							</span>
						) : (
							<span className="text-danger">
								Password does not match
							</span>
						)}
					</FormHelperText>
				)}
			</div>
              <div className="text-center mt-4">
				<Button
					variant="contained"
					disabled={
						
						!password ||
						!confirmPassword ||
						password !== confirmPassword ||
						!hasSixChar ||
						!hasLowerChar ||
						!hasUpperChar ||
						!hasNumber ||
						!hasSpecialChar
					}
					onClick={() => changePassword()}
				>
					Change Password
				</Button>
			</div>
          </div>
       
  );
}