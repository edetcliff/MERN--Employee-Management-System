import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Form, Button, Col, Row} from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEmployee } from '../redux/employeeSlice'

export default function EditEmployee(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleUpdate = (event) => {
        event.preventDefault();        
        let id = params.id                
        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            department: department,
            password: password,
            role: role,
        }

        axios.put(`http://localhost:4000/api/updateEmployee/${id}`, data)
        .then(() =>{
            console.log('Id', id)
            //dipatch
            dispatch(updateEmployee(id));
            navigate('/')
        })
        .catch((err) =>{
            console.log('error adding employee to database ', err);
        })
    }

    const retrieveEmployee = () => {
        let id = params.id
        axios.get(`http://localhost:4000/api/employee/${id}`)
        .then((res) =>{
            let user = res.data
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPassword(user.password);
            setPhone(user.phone);
            setDepartment(user.department);
            setRole(user.role);
            
            console.log('Employee data retrieved ' +res.data)
        })
        .catch((err) =>{
            console.log('Error retrieving employee ' +err)
        })
    }

    useEffect(() => {
        retrieveEmployee();
    },[])

    return(
        <Container fluid>
            <Row>
                <Col lg = {3}></Col>
                <Col lg = {6}>
                    <Form onSubmit = {handleUpdate}>
                    <Form.Group className="mb-3" controlId="formBasicfirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                        name = "firstName"
                        type = "text" 
                        value = {firstName}
                        onChange = {e => setFirstName(e.target.value)}
                        placeholder = "Enter First Name" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                        name = "firstName"
                        type = "text" 
                        value = {lastName}
                        onChange = {e => setLastName(e.target.value)}
                        placeholder = "Enter LastName" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicemail">
                        <Form.Label>email</Form.Label>
                        <Form.Control 
                        name = "email"
                        type = "email" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                        placeholder = "Enter Email" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicphone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                        name = "phone"
                        type = "text" 
                        value = {phone}
                        onChange = {e => setPhone(e.target.value)}
                        placeholder = "Enter Phone" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicpassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        name = "password"
                        type = "password" 
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        placeholder = "Enter Password" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicdepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control 
                        name = "department"
                        type = "text" 
                        value = {department}
                        onChange = {e => setDepartment(e.target.value)}
                        placeholder = "Enter Department" 
                        required
                        />                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicrole">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                        name = "role"
                        type = "text" 
                        value = {role}
                        onChange = {e => setRole(e.target.value)}
                        placeholder = "Enter Role" 
                        required
                        />                        
                    </Form.Group>
                    <Button variant='primary' type = 'submit'>Update</Button>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )


}
