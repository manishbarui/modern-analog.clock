'use client';

import { useEffect, useState } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="clock-container">
      <div className="clock">
        {[...Array(60)].map((_, i) => {
          const rotation = i * 6;
          const isHour = i % 5 === 0;
          return (
            <div
              key={i}
              className="clock-number"
              style={{
                transform: `rotate(${rotation}deg)`
              }}
            >
              {isHour ? (
                <>
                  <span
                    className="hour-number"
                    style={{
                      transform: `rotate(-${rotation}deg)`,
                    }}
                  >
                    {i === 0 ? 12 : i / 5}
                  </span>
                  <div className="hour-marker" />
                </>
              ) : (
                <div className="minute-marker" />
              )}
            </div>
          );
        })}

        <div
          className="hour-hand"
          style={{
            transform: `rotate(${hourDegrees}deg)`
          }}
        />
        <div
          className="minute-hand"
          style={{
            transform: `rotate(${minuteDegrees}deg)`
          }}
        />
        <div
          className="second-hand"
          style={{
            transform: `rotate(${secondDegrees}deg)`
          }}
        />
        <div className="center-dot" />
      </div>

      <div className="digital-time">
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
    </div>
  );
}