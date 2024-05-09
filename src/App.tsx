import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NameList from "./components/NameList";
import HashGenerator from "./components/HashGenerator";

function App() {
	const [page, setPage] = useState<"NameList" | "HashGenerator">("NameList");

	return (
		<div className="App">
			{page === "HashGenerator" ? (
				<>
          <button className="nav-button" onClick={() => setPage("NameList")}>Back</button>
					<HashGenerator />
          
				</>
			) : (
				<>
          <button className="nav-button" onClick={() => setPage("HashGenerator")}/>
					<NameList />
				</>
			)}
		</div>
	);
}

export default App;
