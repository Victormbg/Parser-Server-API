const bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Erro Desconhecido" });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}


/*

RESOLVER AINDA A QUESTAO DO 404

app.use(function (req, res, next) {
  res.status(404).json({
    status: "Erro",
    mensagem: "Pagina não encontrada",
  });
});
*/

// Importando o route para as chamadas de usuario
require("./routes/usuario");
// Importando o route para as chamadas de empresa
require("./routes/empresa");
// Importando o route para as chamadas de vaga
require("./routes/vaga");
