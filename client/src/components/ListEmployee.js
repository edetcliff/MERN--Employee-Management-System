import React, {useEffect} from "react"; 
import axios from "axios";
import {Container, Row, Col, Button, Table} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, setEmployees } from "../redux/employeeSlice";

export default function ListEmployee(){   
    //Redux
    const employeeData = useSelector((state) => state.employeeStore.employees);
    const dispatch = useDispatch();

    const getEmployee = () => {
        axios.get('http://localhost:4000/api/employee')
        .then((res) => {
            //Dispatch
            dispatch(setEmployees(res.data))
           // console.log(res.data)
        })
        .catch((err) => {
            console.log('Could not get Employees ' +err);
        })
    }

    const delEmployee = (id) => {
       var result = window.confirm('Are you sure you want to delete employee?')
       if(result){
        console.log('id ', id)
        axios.delete(`http://localhost:4000/api/deleteEmployee/${id}`)
        .then((res) =>{
            //Dispatch
            dispatch(deleteEmployee(id));
            getEmployee();
        })
        .catch((err) =>{
            console.log('Could not delete Employee');
        })
       }
    }

    useEffect(() => {
        getEmployee();
    })

    return(
        <Container fluid>
            <Row>
                <Col lg = {12}>
                    
                                <Table variant ='light' hover responsive borderless  >
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>department</th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                    employeeData.map((emp, empId) =>{
                                        return(
                                            
                                            <tr key={empId}>
                                                <td>{empId + 1}</td>
                                                <td>{emp.firstName}</td>
                                                <td>{emp.lastName}</td>
                                                <td>{emp.phone}</td>
                                                <td>{emp.email}</td>
                                                <td>{emp.role}</td>
                                                <td>{emp.department}</td>
                                                <td><Link to={`/edit/${emp._id}`} className = 'btn btn-primary'>Edit</Link> </td>
                                                <td>
                                                    <Button variant="danger" onClick={() => {delEmployee(emp._id)}}>Delete</Button>
                                                </td>
                                            </tr>                                            
                                            
                                      )
                                    })
                                }
                                </tbody>
                              </Table>
                      
                </Col>
            </Row>
        </Container>
    )
}
//export default ListEmployee;
 