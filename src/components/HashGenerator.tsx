import React, { useState } from "react";
import { IStudent } from "../types/attendanceTypes";
import { generatePassCodes } from "../services/generatePassCode";

export default function HashGenerator() {
	const [password, setPassword] = useState<string>("");
	const [hash, setHash] = useState<string>("");
	const [student, setStudent] = useState<IStudent | undefined>(undefined);
	const [error, setError] = useState<string>("");
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        setError("");
		if (
			student === undefined ||
			student?.firstName === "" ||
			student?.lastName === ""
		) {
			setError("Please enter a first and last name");
			return;
		}
		if (password.length < 4) {
			setError("Please enter a password longer than 4 characters");
			return;
		}

		event.preventDefault();
		setHash(
			generatePassCodes(
				student?.firstName ?? "",
				student?.lastName ?? "",
				password
			)
		);
	};

	return (
		<div className = "HashGenerator">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className={"pass-input"}
					value={student?.firstName ?? ""}
					onChange={(e) =>
						setStudent({
							lastName: student?.lastName ?? "",
							firstName: e.target.value,
						})
					}
					placeholder="Enter First Name"
				/>
				<input
					type="text"
					className={"pass-input"}
					value={student?.lastName ?? ""}
					onChange={(e) =>
						setStudent({
							firstName: student?.firstName ?? "",
							lastName: e.target.value,
						})
					}
					placeholder="Enter Last Name"
				/>
				<input
					type="text"
					className={"pass-input"}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Enter Password"
				/>
				<input className="submit-button" type="submit" value="Submit" />
			</form>
            <div>
                {error === "" ? hash : error}
            </div>
		</div>
	);
}
