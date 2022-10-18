module.exports = (app, db) => {

	app.get('/', (req, res) => {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(__dirname + '/views' + '/ngIndex.html');
	});

	app.get('/ngIndex.js', (req, res) => {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile(__dirname + '/js' + '/ngIndex.js');
	});

	app.get('/locations', (req, res) => {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(__dirname + '/views' + '/ngLocations.html');
	});

	app.get('/ngLocations.js', (req, res) => {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile(__dirname + '/js' + '/ngLocations.js');
	});

	app.get('/customers', (req, res) => {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(__dirname + '/views' + '/ngCustomers.html');
	});

	app.get('/ngCustomers.js', (req, res) => {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile(__dirname + '/js' + '/ngCustomers.js');
	});

	app.get('/parcels', (req, res) => {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(__dirname + '/views' + '/ngParcels.html');
	});

	app.get('/ngParcels.js', (req, res) => {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile(__dirname + '/js' + '/ngParcels.js');
	});

	app.get('/add-parcel', (req, res) => {
		// send the main (and unique) page
		res.setHeader('Content-Type', 'text/html');
		res.sendFile(__dirname + '/views' + '/ngAddParcel.html');
	});

	app.get('/ngAddParcel.js', (req, res) => {
		// send the angular app
		res.setHeader('Content-Type', 'application/javascript');
		res.sendFile(__dirname + '/js' + '/ngAddParcel.js');
	});



	app.get('/getAllLocations', (req, res) => {
		let sql = 'SELECT locId, locAddress, city FROM Locations';
		// response contains a json array with all tuples
		let postProcessSQL = function (err, result) {
			if (err) throw err;
			res.json(result);
		};
		db.query(sql, postProcessSQL);
	});

	app.get('/insLocation', (req, res) => {
		let address = (req.query.newAddress);
		let city = (req.query.newCity);
		let sql = 'INSERT INTO Locations(locAddress, city) VALUES(?, ?)';
		let values = [address, city];
		// create a json object containing the inserted location
		let postProcessInsert = function (err, result) {
			if (err) throw err;
			res.json({
				id: result.insertId, address: address, city: city,
				insertedLines: result.affectedRows
			});
		};
		db.query(sql, values, postProcessInsert);
	});

	app.get('/getAllCustomers', (req, res) => {
		let sql = 'SELECT c.custId, c.custName, c.custLocation, l.locAddress, l.city FROM Customers c, Locations l where c.custLocation=l.LocId order by c.custId;';
		// response contains a json array with all tuples
		let postProcessSQL = function (err, result) {
			if (err) throw err;
			res.json(result);
		};
		db.query(sql, postProcessSQL);
	});

	app.get('/insCustomer', (req, res) => {
		let name = (req.query.newName);
		let location = (req.query.newLocation);

		let sql = 'INSERT INTO Customers(custName, custLocation) VALUES(?, ?)';
		let values = [name, location];
		// create a json object containing the inserted location
		let postProcessInsert = function (err, result) {
			if (err) throw err;
			res.json({
				id: result.insertId, custName: name, custLocation: location,
				insertedLines: result.affectedRows
			});
		};
		db.query(sql, values, postProcessInsert);
	});

	app.get('/delCustomer', (req, res) => {
		let custId = (req.query.customerId);
		let sql = 'DELETE FROM Customers where custId=?';
		let values = [custId];
		// create a json object containing the inserted location
		let postProcessInsert = (err, result) => {
			if (err) throw err;
			res.json({
				deletedId: custId, "message": "DELETED"
			});
		};
		db.query(sql, values, postProcessInsert);
	});

	app.get('/updateCustomer', (req, res) => {
		let custName = (req.query.custName);
		let custLocation = (req.query.custLocation);
		let custId = (req.query.customerId);
		let sql = 'UPDATE Customers SET custName=?, custLocation=? where custId=?';
		let values = [custName, custLocation, custId];
		// create a json object containing the inserted location
		let postProcessInsert = (err, result) => {
			if (err) throw err;
			res.json({
				id: result.custId, custName: custName, custLocation: custLocation,
				updatedLines: result.affectedRows
			});
		};
		db.query(sql, values, postProcessInsert);
	});


	app.get('/insParcel', (req, res) => {
		let weight = (req.query.weight);
		let customerId = (req.query.customer);
		let location = (req.query.location);

		let sql = 'INSERT INTO Parcels(weight, custId, finalLocation) VALUES(?, ?, ?)';
		let values = [weight, customerId, location];
		// create a json object containing the inserted location
		let postProcessInsert = function (err, result) {
			if (err) throw err;
			res.json({
				id: result.insertId, weight: weight, custId: customerId, custLocation: location,
				insertedLines: result.affectedRows
			});
		};
		db.query(sql, values, postProcessInsert);
	});


	app.get('/getParcels', (req, res) => {
		let cust = (req.query.cust);
		let sql;
		let value = [];
		sql = 'SELECT p.parcelId, p.weight, p.custId, p.finalLocation, c.custName, l.locAddress, l.city FROM Parcels p, Locations l, Customers c ' +
			'WHERE p.finalLocation=l.LocId and c.custId=p.custId;';
		if (cust) {
			sql = 'SELECT p.parcelId, p.weight, p.custId, p.finalLocation, c.custName, l.locAddress, l.city FROM Parcels p, Locations l, Customers c ' +
				'WHERE p.finalLocation=l.LocId and c.custId=p.custId and p.custId=?;';
			value = [cust];
		}
		console.log(sql);
		console.log(JSON.stringify(value));
		// response contains a json array with all tuples
		let postProcessSQL = function (err, result) {
			if (err) throw err;
			res.json(result);
		};
		db.query(sql, value, postProcessSQL);
	});


}

