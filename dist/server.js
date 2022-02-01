"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("./shared/container");

var _database = _interopRequireDefault(require("./database"));

require("express-async-errors");

var _routes = require("./routes");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _AppError = require("./errors/AppError");

var _upload = _interopRequireDefault(require("./config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Inicia as variaveis de ambiaente junto com a aplicação
// import "./database"
(0, _database.default)();
const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_routes.router);
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // Exibe os erros do tipo throw new

app.use((err, req, res, next) => {
  if (err instanceof _AppError.AppError) {
    return res.status(err.statusCode).json({
      "message": err.message
    });
  }

  return res.status(500).json({
    "message": `Error interno da aplicação ${err}`
  });
});
app.listen(8000);