const fs = require('fs');
const array = JSON.parse(fs.readFileSync('vehicle.json', 'utf8'));

//Including dependency
var Sequelize = require(sequelize);

//Setting up the config
var sequelize = new Sequelize('your-database-name', 'db-username', 'db-password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//Checking connection status
sequelize.authenticate().complete(function (err) {
    if (err) {
        console.log('There is connection in ERROR');
    } else {
        console.log('Connection has been established successfully');
    }
});

//Create Item Table Structure
var Item = sequelize.define('Item', {
    id: Sequelize.STRING,
    name:Sequelize.STRING,
    description: Sequelize.STRING
        //.. and other items of vehicle
});

//Applying Item Table to database
sequelize.sync({force:true}).complete(function (err) {
    if(err){
        console.log('An error occur while creating table');
    }else{
        console.log('Item table created successfully');
    }
});

//There is two way of inserting data into database
//One way: Forming object from modal
array.forEach(vehicle => {
    sequelize.sync().success(function () {

        //insert vehicle
        Item.create(
            vehicle
        ).success(function (data) {
            console.log(data.values)
        })
    });
});