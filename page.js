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


app.get('/insParcel', (req, res) => {
let Weight = (req.query.newWeight);
let CustID = (req.query.Custid);
let location = (req.query.local);

let sql = 'INSERT INTO Parcels(weight, custId, finalLocation) VALUES(?, ?)';
let values = [weight, CustID, location];
// create a json object containing the inserted location
let postProcessInsert = function (err, result) {
    if (err) throw err;
    res.json({
        id: result.insertId, weight: Weight,custId: CustID , custLocation: location,
        insertedLines: result.affectedRows
    });
};
db.query(sql, values, postProcessInsert);
});


app.get('/getParcels', (req, res) => {

    let Cust = (req.query.cust);
    let sql;
    let value;


    if (Cust == null)
    {
        sql = 'SELECT weight, custId, finalLocation FROM Parcels';
        console.log(+Cust);
    }
    else{
        sql = 'SELECT weight, custId, finalLocation FROM Parcels WHERE custId=?';
        value = [Cust];
        console.log(Cust);
    }
    console.log(Cust);
    // response contains a json array with all tuples
    let postProcessSQL = function (err, result) {
        if (err) throw err;
        res.json(result);
    };
    connection.query(sql,value, postProcessSQL);
});


