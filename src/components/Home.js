// Filename - components/Home.js

import { React, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let history = useNavigate();
  const [currentData, setCurrentData] = useState([]);
  //     set search query to empty string
  const [q, setQ] = useState("");
  const[filterParam,setFilterParam] = useState(["All"])
  let s_no = 1

  useEffect(
    ()=>{
      fetch('http://localhost:8000/employee').then(
        response => response.json()
      ).then(response=> setCurrentData(response)).catch(
        error=>console.log(error)
      )
    },[]
  )
  //     set search parameters
  //     we only what to search countries by capital and name
  //     this list can be longer if you want
  //     you can search countries even by their population
  // just add it to this array
  const [searchParam] = useState(["name", "profile"]);

  function sort_employees() {
    const strAscending = [...currentData].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    setCurrentData(strAscending);
  }

  function setID(id, name, profile) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("profile", profile);
  }

  // Deleted function - functionality
  // for deleting the entry
  function deleted(id) {
    fetch(`http://localhost:8000/employee/${id}`, {
      method: 'DELETE',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(() => {
    let updatedEmployees = [...currentData].filter(i => i.id !== id)
    setCurrentData(updatedEmployees)
  })
    // We need to re-render the page for getting
    // the results so redirect to same page.
    history("/");
  };
  function search(items) {
    return items.filter((item) => {
    if (item.profile == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(q.toLowerCase()) > -1
                     );
                 });
             } else if (filterParam == "All") {
                 return searchParam.some((newItem) => {
                     return (
                         item[newItem]
                             .toString()
                             .toLowerCase()
                             .indexOf(q.toLowerCase()) > -1
                     );
                 });
             }
         });
     }

  return (
    <>
    <div className="wrapper">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <span className="sr-only">Search here</span>
                    </label>

                    <div className="select">
                        <select
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Countries By Profile"
                        >
                            <option value="All">Filter By Profile</option>
                            <option value="SDE-1">SDE-1</option>
                            <option value="SDE-2">SDE-2</option>
                            <option value="SDE-3">SDE-3</option>
                            <option value="SDM">SDM</option>
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                </div>
    <h1>Department: Technology</h1>
    <div style={{ margin: "5rem" }}>
      <Table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Profile</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping though every element 
						in the array and showing the 
						data in the form of table */}
          {search(currentData).map((item) => {
            return (
              <tr key={item.id}>
                <td>{s_no++}</td>
                <td>{item.name}</td>
                <td>{item.profile}</td>

                {/* getting theid,name, and 
									age for storing these
									value in the jsx with 
									onclick event */}
                <td>
                  <Link to={`/edit`}>
                    <Button
                      onClick={() => setID(item.id, item.name, item.profile)}
                      variant="info"
                    >
                      Update
                    </Button>
                  </Link>
                </td>

                {/* Using thr deleted function passing
									the id of an entry */}
                <td>
                  <Button onClick={() => deleted(item.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Button for redirecting to create page for
				insertion of values */}
      <Link className="d-grid gap-2 my-3" to="/create">
        <Button variant="warning" size="lg">
          Create
        </Button>
      </Link>
      <Button
        className="row my-3"
        variant="success"
        size="lg"
        onClick={sort_employees}
      >
        Sort
      </Button>
    </div>
    </>
  );
}

export default Home;
