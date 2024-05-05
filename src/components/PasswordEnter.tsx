import React, { useState } from "react";
import { IPrivateAttendanceInfo } from "../types/attendanceTypes";
import { IStudent } from "../types/attendanceTypes";
import { fetchPrivateInfo } from "../services/fetchPrivateInfo";
import PrivateAttendanceInfo from "./PrivateAttendanceInfo";

export default function PasswordEnter(props: IStudent) {
	// Fetch the private student information
	const [studentInfo, setStudentInfo] = useState<
		IPrivateAttendanceInfo | undefined
	>(undefined);
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Try to get the private info
		fetchPrivateInfo(password, props).then((privateInfo) => {
			if (privateInfo === undefined) {
				setError("Invalid Code");
				return;
			}
			setStudentInfo(privateInfo);
		});
	};
	return (
		<>
			{studentInfo === undefined ? (
				<form onSubmit={handleSubmit}>
						<input
							type="password"
              className= {"pass-input " + (error!== "" ? "error" : "")}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
						/>
					<input className="submit-button" type="submit" value="Submit" />
				</form>
			) : (
				<PrivateAttendanceInfo {...studentInfo}/>
			)}
		</>
	);
}
