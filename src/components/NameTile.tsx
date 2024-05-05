import React from "react";
import { IPublicAttendanceInfo } from "../types/attendanceTypes";
import PasswordEnter from "./PasswordEnter";
import Accordion from "./Accordion";

export default function NameTile(props: IPublicAttendanceInfo) {
	return (
		<div className={`name-tile ${props.improvedAttendance ? "improved" : "worsened"}`}>
			<div className="name-header">
				<h1 className={`name`}>
					{props.firstName} {props.lastName}
				</h1>
			</div>
			<Accordion title="More Details">
				<PasswordEnter {...props} />
			</Accordion>
		</div>
	);
}
