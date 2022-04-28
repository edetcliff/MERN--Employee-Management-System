const express = require('express');

const employeeModel = require('../models/employeeModel.js');

const employeeRoute = express.Router();
    


/**
 * @swagger
 * components:
 *   schemas:
 *     Def:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The employee ID.
 *         firstName:
 *           type: string
 *           description: The employee's first name.
 *         lastName:
 *           type: string
 *           description: The employee's last name.
 *         email:
 *           type: string
 *           description: The employee's email.
 *         phone:
 *           type: string
 *           description: The employee's phone.
 *         password:
 *           type: string
 *           description: The employee's password.
 *         department:
 *           type: string
 *           description: The employee's department.
 *         role:
 *           type: string
 *           description: The employee's role.
 */


/**
 * @swagger
 * /api/employee:
 *   get:
 *     summary: Retrieve a list of Employee.
 *     description: Retrieve a list of Employee from Employee Management System. 
 *     responses:
 *       200:
 *         description: A list of Employee. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Def'
*/                      
employeeRoute.route('/employee').get((req, res) => {
    employeeModel.find((err, employee) =>{
        if (err) {
            console.log('error occured ' +err);
            res.status(400).json('error occured ' +err);            
        }
        else{
            res.json(employee);
        }
    })
})

/**
 * @swagger
 * /api/addEmployee:
 *   post:
 *     summary: add a new Employee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Def'
 *     description: add a new Employee to Employee Management System. 
 *     responses:
 *       201:
 *         description: A new Employee added. 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Def'
*/  
employeeRoute.route('/addEmployee').post((req, res) =>{
    let employee = employeeModel( req.body);
    employee.save()
    .then(() =>{
        res.status(201).json('Employee addded Successfully')
    })
    .catch((error) => {
        res.status(400).json('Error adding Employee ' +error )
    })
})

/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Retrieve an Employee by Id.
 *     description: Retrieve an Employee from Employee Management System. 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve.
 *     responses:
 *       200:
 *         description: An Employee by Id. 
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Def'
*/ 
employeeRoute.route('/employee/:id').get((req, res) =>{
    let employeeId = req.params.id;
    employeeModel.findById(employeeId, (error, employee) =>{
        res.json(employee)
    })
})

/**
 * @swagger
 * /api/updateEmployee/{id}:
 *   put:
 *     summary: Update an Employee by Id.
 *     description: Update an Employee from Employee Management System. 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Def' 
 *     responses:
 *       200:
 *         description: Update Employee by Id. 
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Def'
*/
employeeRoute.route('/updateEmployee/:id').put((req, res) =>{
    let employeeId = req.params.id;
    employeeModel.findById(employeeId, (error, employee) =>{
        if (error) {
           return next(new Error('Error occured'))
        }
        else{
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;
            employee.phone = req.body.phone;
            employee.department = req.body.department;
            employee.role = req.body.role;
            employee.password = req.body.password;
            employee.save()
            .then(() =>{
                res.status(200).json('Employee Updated Successfully')
            })
            .catch((error) => {
                res.status(400).send('Unable to update user '+ error)
            })
        }
    })
})

/**
 * @swagger
 * /api/deleteEmployee/{id}:
 *   delete:
 *     summary: Delete an Employee by Id.
 *     description: Retrieve an Employee from Employee Management System. 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve.
 *     responses:
 *       200:
 *         description: Delete an Employee by Id. 
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Def'
*/
employeeRoute.route('/deleteEmployee/:id').delete((req, res) =>{
    let employeeId = req.params.id
    employeeModel.findOneAndDelete(employeeId, (error, employee) =>{
        if (error) {
            return res.status(400).json('Could not delete employee')
        } else {
            res.status(200).json('Employee deleted successfully')
        }
    })
});

module.exports = employeeRoute;