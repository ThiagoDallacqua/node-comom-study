module.exports = function(app) {
  var listaProdutos = function(req, res, next) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);

    produtosDAO.lista(function(err, result) {
      if (err) {
        return next(err);
      }
      res.format({
        html: function() {
          res.render('produtos/lista', {lista: result})
        },
        json: function() {
          res.json(result)
        }
      });

    });

    connection.end();
  }

  app.get('/produtos', listaProdutos);

  app.get('/produtos/form', function(req, res) {
    res.render('produtos/form', {errosValidacao: {}, produto: {}});
  })

  app.post('/produtos', function(req, res) {
    var connection = app.infra.connectionFactory();
    var produtosDAO = new app.infra.ProdutosDAO(connection);
    var produto = req.body;

    var validadorTitulo = req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    var validadorTitulo = req.assert('preco', 'Formato de preço inválido').isFloat();

    var erros = req.validationErrors();

    if (erros) {
      res.format({
        html: function() {
          res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto})
        },
        json: function() {
          res.status(400).json(erros)
        }
      });
      return;
    }

    produtosDAO.salva(produto, function(err, result) {
      res.redirect('/produtos')
    })
  })
}
