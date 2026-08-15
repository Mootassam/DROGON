import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountdownTimer = ({ startTime, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(); // Call the completion callback when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev - 1;
        const newProgress = Math.max((newTimeLeft / startTime) * 100, 0); // Ensure progress doesn't go below 0
        setProgress(newProgress);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, startTime, onComplete]);

  return (
    <div className="countdown-timer">
      <div style={{ width: "200px" }}>
        <CircularProgressbar
          value={progress}
          text={`${Math.ceil(timeLeft)}s`} // Display percentage rounded to the nearest whole number
        />
      </div>
      <div className="loader"></div>
      <p style={{ color: "black" }} className="loading__text">
        <span>
          Thank you for your selection. Our system is now processing your trade
          with the amount and time you’ve chosen. Please be patient as we work
          to secure the best outcome for you.
        </span>
        <span>
          Your profit details will be available shortly. Hang tight, we're
          working for your success!
        </span>
      </p>
    </div>
  );
};

export default CountdownTimer;
