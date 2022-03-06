require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// server init
const app = express();
const server = http.createServer(app);
const NAMESPACE = "Server Protocol";
// cors
app.use(cors({ origin: "*" }));


// Swagger Options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Basic User API System Doc",
            version: "1.0.0",
            description: "Instance of a user system process"
        },
        license: {
            name: "MIT"
        },
        servers: [
            {
                url: "http://localhost:4001"
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);

// db
const connection = require('./config');
// route
const UserRouter = require('./routes/User');


const PORT = process.env.PORT || 4000 ;


// Middlewares
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', UserRouter);

server.listen(PORT, err => {
    if(err){
        console.debug(err);
        process.exit(1);
    }
    console.debug(NAMESPACE, `Server active on port ${PORT}`);
});