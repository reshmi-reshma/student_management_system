import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from './component/nav';
import Side from './component/side';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from the API when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students");
        if (response.ok) {
          const data = await response.json();
          setStudents(data); // Store the student data in the state
        } else {
          console.error("Error fetching students:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <Nav />
      <div className="row mt-3">
        <div className="col-sm-2">
          <Side />
        </div>
        <div className="col-sm-9 m-3">
          <div className="row">
            <div className="col-sm-3">
              <h3>Students</h3>
            </div>
            <div className="col-sm-3"></div>
            <div className="col-sm-3">
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              </form>
            </div>
            <div className="col-sm-3">
              <form className="d-flex">
                <Link to="/new" className="btn btn-outline-primary" role="button">Add new student</Link>
              </form>
            </div>
          </div>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Age</th>
                <th>Grade</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Address</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>{student.branch}</td>
                    <td>{student.year}</td>
                    <td>{student.address}</td>
                    <td>{student.feedback}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No students available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const handleDelete = async (id) => {
  const response = await fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Student deleted successfully!");
    // Reload the student data after deletion
    window.location.reload();
  } else {
    alert("Failed to delete student.");
  }
};

export default App;
