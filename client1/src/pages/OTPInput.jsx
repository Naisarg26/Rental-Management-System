import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

export default function () {
  const { email, otp, setEmail } = useContext(UserContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  function resendOTP() {
    if (disable) return;
    axios
      .post(`${process.env.REACT_APP_API_URL}/send_recovery_email`, {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() =>
        alert("A new OTP has successfully been sent to your email.")
      )
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setEmail(email);
      navigate("/reset");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); // each count lasts for a second

    return () => clearInterval(interval); // cleanup the interval on complete
  }, [disable]);

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="text-center mb-3 alert alert-primary">
        <label htmlFor="" className="h2">
          Email Verification
        </label>
      </div>
      <div className="text-center">
              <p style={{ fontSize: '20px' }}>We have sent a code to your email {email}</p>
            </div>
      <div className="form-group mt-4 space-y-4 lg:mt-5 md:space-y-5">
        <form>
          <div style={{ display: "flex", flexDirection: "row", gap: "4px", justifyContent: "center" }}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="w-6 h-6">
                <TextField
  variant="outlined"
  size="small"
  className="w-6 h-6 flex flex-col items-center justify-center text-center px-1"
  type="text"
  name=""
  id=""
  value={OTPinput[index]}
  onChange={(e) => {
    const updatedOTPInput = [...OTPinput];
    updatedOTPInput[index] = e.target.value.slice(0, 1); // Restrict to max length of 1
    setOTPinput(updatedOTPInput);
  }}
  inputProps={{
    maxLength: 1,
    style: { textAlign: 'center' } // Center the text
  }}
/>

              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
				<Button
					variant="contained"
					
					onClick={verifyOTP}
				>
					Verify Account
				</Button>

            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't receive the code?</p>{" "}
              <Button
                style={{
                  color: disable ? "gray" : "blue",
                  cursor: disable ? "none" : "pointer",
                  textDecorationLine: disable ? "none" : "underline",
                }}
                onClick={resendOTP}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
