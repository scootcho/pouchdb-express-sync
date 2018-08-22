var db = new PouchDB('test_db');

db.post({ "test": 123 }).then(function(result) {
  console.log('======== finish writing to local db ======', result);
}, function(error) {
  console.log(error);
});

var remoteDB = new PouchDB('http://localhost:3000/db/myDb')
// check http://localhost:3000/db/test_db to see if server db is updated per client db

db.sync(remoteDB).on('complete', function () {
  // yay, we're in sync!
  console.log('===================== sync completed!!! ====================');
}).on('error', function (err) {
  // boo, we hit an error!
  console.log('===================== sync error!!! ====================', err);
});

db.allDocs({include_docs: true, descending: true})
  .then(function(results){
    console.log('============= Query allDocs ==============', results)
  })
  .catch(function(error) {
    console.log('=========== error ===========', error)
})

