const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
//import colors from 'colors';
const  connectDb = require('./config/db.js');
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Import all express route
const EmployeeRoute = require('./controllers/employeeController.js');


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Employee Management System',
        version: '1.0.0',
        description: 'Rest API for Employee Management System',
        license: {
            name: 'License Under MIT',
            url: 'https://spdx.org/licenses/MIT.html'          
        },
        contact: {
            name: 'Clifford Edetanlen',
            url: 'https://cliffordedetanlen.com',
            email: 'clifford@gmail.com',           
        },
      },
      servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        }
    ],
    },    
    apis: ['./controllers/employeeController.js'], 
    
  };

  const openApiSpec = swaggerJsdoc(options);

//dotenv
dotenv.config();

//connect to database
connectDb();

//create express server
const app = express();

//Encode urlencoded
app.use(urlencoded({ extended: true }));

//Convert incoming data to json format
app.use(json());

//Enable cors
app.use(cors());

//Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

//Route Configuration
app.use('/api', EmployeeRoute);


//server port setup
const port = process.env.PORT || 4000;

//Start express server
app.listen(port, () => {
    console.log('Server Listening on port ' +port);
})