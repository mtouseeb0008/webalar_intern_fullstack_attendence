// // ParentComponent.js
// import React from 'react';
// import CalendarView from './CalendarView';

// function ParentComponent() {
//   const handleDateSelect = (date) => {
//     console.log('Selected date:', date);
//     // Add your logic for handling the selected date
//   };

//   return (
//     <div>
//       <CalendarView handleDateSelect={handleDateSelect} />
//     </div>
//   );
// }

// export default ParentComponent;

// ParentComponent.js
import React, { useState } from 'react';
import CalendarView from './CalendarView';

function ParentComponent() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (date) => {
    const dateStr = date.toDateString();
    setSelectedDates((prevSelectedDates) =>
      prevSelectedDates.includes(dateStr)
        ? prevSelectedDates.filter((date) => date !== dateStr)
        : [...prevSelectedDates, dateStr]
    );
  };

  return (
    <div>
      <CalendarView selectedDates={selectedDates} handleDateSelect={handleDateSelect} /> {/* Pass selectedDates and handleDateSelect */}
    </div>
  );
}

export default ParentComponent;

