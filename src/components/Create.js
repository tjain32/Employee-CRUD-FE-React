// Filename - components/Create.js

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link, useNavigate } from "react-router-dom";

function Create() {
	// Making usestate for setting and
	// fetching a value in jsx
	const [name, setname] = useState("");
	const [profile, setprofile] = useState("");

	// Using useNavigation for redirecting to pages
	let history = useNavigate();

	// Function for creating a post/entry
	const handelSubmit = (e) => {
		e.preventDefault(); // Prevent reload

		// Fetching a value from usestate and
		// pushing to javascript object
		let employee = {
			name:'',
			profile:''
		}
		if (name === "" || profile === "") {
			alert("invalid input");
			return;
		}
		employee.name = name;
		employee.profile = profile;
		fetch(`http://localhost:8000/employee`, {
     	method: 'POST',
      	headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
	  body: JSON.stringify(employee),})
	  .then(() => {
        alert("New item created")
		// Redirecting to home page after creation done
		history("/");
    })
}

	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* Fetching a value from input textfirld 
					in a setname using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicName"
				>
					<Form.Control
						onChange={(e) =>
							setname(e.target.value)
						}
						type="text"
						placeholder="Enter Name"
						required
					/>
				</Form.Group>

				{/* Fetching a value from input textfirld in
					a setage using usestate*/}
				<Form.Group
					className="mb-3"
					controlId="formBasicProfile"
				>
					<Form.Control
						onChange={(e) =>
							setprofile(e.target.value)
						}
						type="text"
						placeholder="Profile"
						required
					/>
				</Form.Group>

				{/* handing a onclick event in button for
					firing a function */}
				<Button
					onClick={(e) => handelSubmit(e)}
					variant="primary"
					type="submit"
				>
					Submit
				</Button>

				{/* Redirecting back to home page */}
				<Link className="d-grid gap-2" to="/">
					<Button variant="info" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Create;
