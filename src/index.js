'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Config = require('./config');
const router = require('./router/router');
const port = process.env.PORT || 8080;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(Config.AccessControl);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const swaggerDocs = swaggerJsDoc(Config.SwaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

router.init(app);

app.listen(port, () => console.log(`hackapp-api listening at: ${port}...`));