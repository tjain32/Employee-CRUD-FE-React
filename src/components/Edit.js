// Filename - Edit.js
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Edit() {
	// Here usestate has been used in order
	// to set and get values from the jsx
	const [name, setname] = useState("");
	const [profile, setprofile] = useState("");
	const [id, setid] = useState("");

	// Used for navigation with logic in javascript
	let history = useNavigate();

	// Function for handling the edit and
	// pushing changes of editing/updating
	const handelSubmit = (e) => {
		// Preventing from reload
		e.preventDefault();
		if (name === "" || profile === "") {
			alert("invalid input");
			return;
		}
		let a = {
			name: '',
			profile:''
		}
		//create JSON body with name and profile and put id in URL.
		a.name = name;
		a.profile = profile;
		
		fetch(`http://localhost:8000/employee/${id}`, {
     	method: 'PUT',
      	headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
	  body: JSON.stringify(a),})
	  .then(() => {
        alert("You have updated data with following id - " + id)
		// Redirecting to home page after updation
		history("/");
    })
	};

	// Useeffect take care that page will
	// be rendered only once
	useEffect(() => {
		setname(localStorage.getItem("name"));
		setprofile(localStorage.getItem("profile"));
		setid(localStorage.getItem("id"));
	}, []);

	return (
		<div>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
			>
				{/* setting a name from the 
					input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicName"
				>
					<Form.Label>Name</Form.Label>
					<Form.Control
						value={name}
						onChange={(e) =>
							setname(e.target.value)
						}
						type="text"
						placeholder="Enter Name"
					/>
				</Form.Group>

				{/* setting a age from the input textfiled */}
				<Form.Group
					className="mb-3"
					controlId="formBasicAge"
				>
					<Form.Label>Profile</Form.Label>
					<Form.Control
						value={profile}
						onChange={(e) =>
							setprofile(e.target.value)
						}
						type="text"
						placeholder="Profile"
					/>
				</Form.Group>

				{/* Hadinling an onclick event 
					running an edit logic */}
				<Button
					onClick={(e) => handelSubmit(e)}
					variant="primary"
					type="submit"
					size="lg"
				>
					Update
				</Button>

				{/* Redirecting to main page after editing */}
				<Link className="d-grid gap-2" to="/">
					<Button variant="warning" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default Edit;
