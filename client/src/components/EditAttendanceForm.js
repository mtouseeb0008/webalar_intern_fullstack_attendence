// src/components/EditAttendanceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditAttendanceForm = ({ attendance }) => {
  const [status, setStatus] = useState(attendance.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/attendance/${attendance.id}`, { status });
      console.log('Attendance updated successfully.');
    } catch (error) {
      console.error('Error updating attendance: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </label>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditAttendanceForm;
