var PouchDB = require('pouchdb');
var cors = require('cors')
var express = require('express');
var app = express();
app.use(cors());
var PORT = 3000

// app.use('/db', require('express-pouchdb')(PouchDB));
// var testDb = new PouchDB('test_db');
// // localhost:3000/db/test_db (available via domain/db/foo)
// // testDb is now modifiable in your own code

var Db = PouchDB.defaults({prefix: './.data/blah'});
app.use('/db', require('express-pouchdb')(Db));
var testDb = new Db('myDb')
// the database can be located at http://localhost:3000/db/myDb
// (route/dbname) regardless of what prefix is

var listener = app.listen(PORT, function () {
  testDb.info().then(function(info) {
    console.log(info);
  });
  console.log('Your app is listening on port ' + listener.address().port);
});
