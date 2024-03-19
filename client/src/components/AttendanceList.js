// src/components/AttendanceList.js
import React from "react";
import axios from "axios";

const AttendanceList = ({ attendance }) => {
  const handleEdit = async (id) => {
    // Redirect to edit page or implement inline editing
  };

  return (
    <div>
      <h2>Attendance List</h2>
      <ul>
        {attendance?.map((record) => (
          <li key={record.id}>
            {record.date} - {record.status}
            <button onClick={() => handleEdit(record.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
