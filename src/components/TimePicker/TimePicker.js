import React, { useState, useRef } from 'react';
import './TimePicker.css';

function TimePicker({ onTimeSet }) {
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedSecond, setSelectedSecond] = useState(0);

  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const isDraggingMinute = useRef(false);
  const isDraggingSecond = useRef(false);
  const startY = useRef(0);
  const scrollStartYMinute = useRef(0);
  const scrollStartYSecond = useRef(0);

  const generateOptions = (max) => {
    return Array.from({ length: max }, (_, i) => (
      <div key={i} className="picker-item">
        {i < 10 ? `0${i}` : i}
      </div>
    ));
  };

  const handleMinuteMouseDown = (e) => {
    isDraggingMinute.current = true;
    startY.current = e.clientY;
    scrollStartYMinute.current = minuteRef.current.scrollTop;
  };

  const handleSecondMouseDown = (e) => {
    isDraggingSecond.current = true;
    startY.current = e.clientY;
    scrollStartYSecond.current = secondRef.current.scrollTop;
  };

  const handleMouseMove = (e) => {
    if (isDraggingMinute.current) {
      const delta = e.clientY - startY.current;
      minuteRef.current.scrollTop = scrollStartYMinute.current - delta;
    }
    if (isDraggingSecond.current) {
      const delta = e.clientY - startY.current;
      secondRef.current.scrollTop = scrollStartYSecond.current - delta;
    }
  };

  const handleMouseUp = () => {
    isDraggingMinute.current = false;
    isDraggingSecond.current = false;
    const minuteIndex = Math.round(minuteRef.current.scrollTop / 40);

    setSelectedMinute(minuteIndex + 1);
    minuteRef.current.scrollTop = minuteIndex * 40;

    const secondIndex = Math.round(secondRef.current.scrollTop / 40);
    setSelectedSecond(secondIndex + 1);
    secondRef.current.scrollTop = secondIndex * 40;
  };

  const handleSetTime = () => {
    onTimeSet(selectedMinute, selectedSecond);
  };

  return (
    <div className="time-picker">
      <div
        className="picker-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="picker-wrapper"
          ref={minuteRef}
          onMouseDown={handleMinuteMouseDown}
        >
          {generateOptions(60)}
        </div>
        <span className="colon">:</span>
        <div
          className="picker-wrapper"
          ref={secondRef}
          onMouseDown={handleSecondMouseDown}
        >
          {generateOptions(60)}
        </div>
      </div>
      <button onClick={handleSetTime} className="set-time-button">
        Старт
      </button>
    </div>
  );
}

export default TimePicker;
