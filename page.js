// load all modules
let express = require('express');
let ejs = require('ejs');
let mysql = require('mysql');
//setup app
let app = express();
app.set('view engine', 'html');
app.engine('html',ejs.renderFile);
// set up the database engine
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: '22108198',
        password: '9222FD',
        database: 'db_22108198'
    }
)
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})
app.listen(3005);


app.get('/showLocations',
    function(req,res){
        //query the databse and render output;
        sql = 'SELECT LocId, locAddress, city FROM Locations ';
        connection.query(sql,
            function(err, Locations, fields){
                if (err) throw err;
                res.setHeader('Content-Type', 'text/html');
                res.render('CustLoc.html',{'rows': Locations});
            });
        });

app.get('/showLocation',
function(req,res){
    //query the databse and render output;
    sql = 'SELECT LocId, locAddress, city FROM Locations ';
    connection.query(sql,
        function(err, Locations, fields){
            if (err) throw err;
            res.setHeader('Content-Type', 'text/html');
            res.render('CustLoc.html',{'rows': Locations});
        });
    });



    app.get('/ShowParcelinfo',
    function(req,res){
        //query the databse and render output;
        sql = 'SELECT parcelId, weight , locId  \
         FROM Parcels inner join Locations \
         on Parcels.finalLocation = Locations.LocId ';
        connection.query(sql,
            function(err, data, fields){
                if (err) throw err;
                res.setHeader('Content-Type', 'text/html');
                res.render('CustLoc.html',{'rows': data});
            });

    }); 
   
    app.get('/ShowParcel',
    function(req,res){
        //query the databse and render output;
        sql = 'SELECT * FROM Parcels';
        connection.query(sql,
            function(err, data, fields){
                if (err) throw err;
                res.setHeader('Content-Type', 'text/html');
                res.render('CustLoc.html',{'rows': data});
            });

    }); 

