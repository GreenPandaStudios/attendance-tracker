import React from 'react';
import { IPrivateAttendanceInfo } from '../types/attendanceTypes';

const PrivateAttendanceInfo = (props: IPrivateAttendanceInfo) => {
  return (
    <div className="attendance-info">
      {props.attendanceInfo.map((attendanceInfo, index) => (
        <div key={index} className="attendance-item">
            {attendanceInfo.date}, {attendanceInfo.attendancePercentage}%
        </div>
      ))}
    </div>
  );
}

export default PrivateAttendanceInfo;
