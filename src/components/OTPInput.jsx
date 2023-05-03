import React, { useState, useRef } from "react";
import "./App.css"

const OTPInput = ({ onClose }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (event, index) => {
    const { value } = event.target;
    const isBackspace = value === "";
  
    // check if input value is numeric and has only one digit
    if (/^\d$/.test(value)) {
      // update OTP state array
      setOTP((prev) => {
        const otpArray = prev.slice();
        otpArray[index] = value;
        return otpArray;
      });
      // move focus to next input
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (isBackspace) {
      // clear input and move focus to previous input
      setOTP((prev) => {
        const otpArray = prev.slice();
        otpArray[index] = "";
        return otpArray;
      });
      if (index > 0) {
        inputRefs.current[index].focus();
      }
    }
  };
  
  const handleKeyUp = (event, index) => {
    const { key } = event;
    switch (key) {
      case "ArrowLeft":
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      case "ArrowRight":
        if (index < 5) {
          inputRefs.current[index + 1].focus();
        }
        break;
      case "Backspace":
        setOTP((prev) => {
          const otpArray = prev.slice();
          otpArray[index] = "";
          return otpArray;
        });
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
        break;
      default:
        break;
    }
  };
  

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("Text").slice(0, 6);
    const otpArray = clipboardData.split("").map((digit) => (isNaN(digit) ? "" : digit));
    setOTP(otpArray.concat(Array(6 - otpArray.length).fill("")));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredOTP = otp.join("");
    console.log(enteredOTP.length)
    alert(`Entered OTP: ${enteredOTP}`);
  };

  const isVerifyDisabled = otp.some((digit) => !digit);
  return (
    <div className="overlay">
      <div className="otp-modal">
        <h2>Enter OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="otp-input-container">
            {otp.map((digit, index) => (
            //   <input
            //     key={index}
            //     ref={(el) => (inputRefs.current[index] = el)}
            //     type="text"
            //     pattern="[0-9]*"
            //     inputMode="numeric"
            //     value={digit}
            //     onChange={(event) => handleChange(event, index)}
            //     onKeyDown={(event) => handleKeyDown(event, index)}
            //     onPaste={handlePaste}
            //     maxLength="1"
            //   />
            <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                value={digit}
                onChange={(event) => handleChange(event, index)}
                onKeyUp={(event) => handleKeyUp(event, index)}
                onPaste={handlePaste}
                maxLength="1"
            />

            ))}
          </div>
          <div className="otp-button-container">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={isVerifyDisabled}>Verify</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPInput;
