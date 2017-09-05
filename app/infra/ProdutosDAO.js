class ProdutosDAO {
  constructor(connection) {
    this._connection = connection;
  }

  lista(callback){
    this._connection.query('select * from produtos', callback);
  }

  salva(produto, callback){
    this._connection.query('insert into produtos set ?', produto, callback)
  }

  apaga(produto, callback){
    this._connection.query('delete from produtos where id = ?', produto.id, callback)
  }
}

module.exports = function() {
  return ProdutosDAO
}
