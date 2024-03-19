import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calender.css";

const CalendarView = ({ handleDateSelect }) => {
  const [date, setDate] = useState(new Date());
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const onChange = (date) => {
    setDate(date);
    handleDateSelect(date);
  };

  useEffect(() => {
    // Mark all dates before today as green by default
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const datesBeforeToday = {};
    for (
      let d = new Date();
      d > new Date("2020-01-01");
      d.setDate(d.getDate() - 1)
    ) {
      if (d < today) {
        datesBeforeToday[d.toDateString()] = true; // true signifies presence
      }
    }
    setAttendanceList(datesBeforeToday);
  }, []);

  const onClickDay = (value, event) => {
    const dateStr = value.toDateString();
    // Toggle the attendance status for the clicked date
    setAttendanceList((prev) => ({
      ...prev,
      [dateStr]: !prev[dateStr],
    }));
  };

  const tileClassName = ({ date, view }) => {
    const dateStr = date.toDateString();
    // Mark selected dates based on their status in the `attendance` state
    if (attendanceList[dateStr]) {
      return "bg-green-500"; // Tailwind CSS class for green background
    } else if (attendanceList.hasOwnProperty(dateStr)) {
      return "bg-red-500"; // Tailwind CSS class for red background
    }
    // Apply no additional class by default
    return null;
  };

  // const onClickDay = (value, event) => {
  //   // Toggle selected date
  //   const newSelectedDates = [...selectedDates];
  //   const dateStr = value.toDateString();
  //   const dateIndex = newSelectedDates.findIndex((d) => d === dateStr);

  //   if (dateIndex === -1) {
  //     newSelectedDates.push(dateStr);
  //   } else {
  //     newSelectedDates.splice(dateIndex, 1);
  //   }

  //   setSelectedDates(newSelectedDates);
  // };

  // const tileClassName = ({ date, view }) => {
  //   // Add custom class to selected dates
  //   if (selectedDates.includes(date.toDateString())) {
  //     return "present";
  //   }

  //   // Mark dates before today (and not selected) as missed (red)
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Normalize today to start of the day
  //   if (date < today) {
  //     return "missed";
  //   }
  //   return null;
  // };

  return (
    <div className=" w-full h-screen flex gap-4 flex-col items-center p-4">
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={onClickDay}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarView;
