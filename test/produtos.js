var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController', function() {
  beforeEach(function(done) {
    var connection = express.infra.connectionFactory();
    connection.query("delete from produtos", function(ex, result) {
      if(!ex){
        done()
      }
    })
  });

  it('#listagem json', function(done) {
    request.get('/produtos')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });

  it('#listagem html', function(done) {
    request.get('/produtos')
    .set('Accept', 'text/html')
    .expect('Content-Type', /html/)
    .expect(200, done);
  });

  it('#POST do form com dados invalidos', function(done) {
    request.post('/produtos')
    .send({
      titulo: '',
      descicao: 'novo livro'
    })
    .expect(400, done);
  });

  it('#POST do form com dados validos', function(done) {
    request.post('/produtos')
    .send({
      titulo: 'novo livro',
      preco: '123.50',
      descicao: 'novo livro'
    })
    .expect(302, done);
  });
});
