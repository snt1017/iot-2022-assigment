
// init server
let express = require('express');
let app = express();

// database configuration
let mysql = require('mysql');
let db = mysql.createConnection(
 {
  host: 'localhost',
  user: '22108560',
  password: '8327GG',
  database: 'db_22108560_2',
 }
);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
}); 

// load routes: define controller which act on db
let routes = require('./components/routes.js');

app.use(express.static(__dirname + '/public'));

routes(app, db);


let port = 3016
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

 





