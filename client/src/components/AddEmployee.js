import { useState } from "react";
import axios from 'axios';
import { Container, Form, Button, Col, Row,} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from '../redux/employeeSlice'

export default function AddEmployee(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            department: department,
            password: password,
            role: role,
        }

        axios.post('http://localhost:4000/api/addEmployee', data)
        .then((res) =>{
            let employeeData = res.data
            //dipatch
            dispatch(addEmployee(employeeData));
            navigate('/')
        })
        .catch((err) =>{
            console.log('error adding employee to database ', err);
        })
    }

    return(
        <Container fluid>
            <Row>
                <Col lg = {3}></Col>
                <Col lg = {6}>
                    <Form onSubmit = {handleSubmit}>
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

                    <Form.Group className="mb-3" controlId="formBasiclastName">
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
                        name = "Email"
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
                    <Button variant='primary' type = 'submit'>
                        Submit
                    </Button>
                    </Form>
                </Col>
                <Col lg = {3}></Col>
            </Row>
            
        </Container>
    )


}
