import React, { useState } from "react";
import Nav from "./component/nav";  // Assuming this is a component in your project
import Side from "./component/side";  // Assuming this is a component in your project

export default function New() {
  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    branch: "",
    address: "",
    phone: "",
    grade: "",
    year: "",
    feedback: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Submitting data:", studentData); // Log data before sending
    const response = await fetch("http://localhost:5000/api/students/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });
  
    if (response.ok) {
      alert("Student saved successfully!");
      setStudentData({
        id: "",
        name: "",
        email: "",
        age: "",
        branch: "",
        address: "",
        phone: "",
        grade: "",
        year: "",
        feedback: "",
      });
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Log error details
      alert("Failed to save student: " + (errorData.message || "An error occurred"));
    }
  };
  

  // DELETE
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:5000/api/students/${studentData.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Student deleted successfully!");
      setStudentData({
        id: "",
        name: "",
        email: "",
        age: "",
        branch: "",
        address: "",
        phone: "",
        grade: "",
        year: "",
        feedback: "",
      });
    } else {
      alert("Failed to delete student.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="row mt-3">
        <div className="col-sm-2">
          <Side />
        </div>
        <div className="col-sm-9 m-3">
          <h3>Student Details</h3>
          <div className="row">
            <div className="col-sm-6">
              <div className="input-group mb-3">
                <span className="input-group-text">ID</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your ID here..."
                  name="id"
                  value={studentData.id}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email here..."
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                />
                <span className="input-group-text">E-Mail</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Age</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Your age here..."
                  name="age"
                  value={studentData.age}
                  onChange={handleChange}
                />
              </div>
              <select
                className="form-select"
                name="branch"
                value={studentData.branch}
                onChange={handleChange}
              >
                <option value="">Branch</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ECE">ECE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECHANICAL">MECHANICAL</option>
              </select>
              <div className="input-group mt-3">
                <span className="input-group-text">Address</span>
                <textarea
                  className="form-control"
                  name="address"
                  value={studentData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Name here..."
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter your Phone number here..."
                  name="phone"
                  value={studentData.phone}
                  onChange={handleChange}
                />
                <span className="input-group-text">Phone Number</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Grade</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your grade here..."
                  name="grade"
                  value={studentData.grade}
                  onChange={handleChange}
                />
              </div>
              <select
                className="form-select mt-3"
                name="year"
                value={studentData.year}
                onChange={handleChange}
              >
                <option value="">Year</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
              </select>
              <div className="input-group mt-3">
                <span className="input-group-text">Feedback</span>
                <textarea
                  className="form-control"
                  name="feedback"
                  value={studentData.feedback}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4">
              <button className="btn btn-success" onClick={handleSave}>
                Save Student
              </button>
            </div>
            <div className="col-sm-4 mt-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
