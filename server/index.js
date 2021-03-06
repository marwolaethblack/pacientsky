const express = require('express');
const compression = require('compression');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');

const serverRenderer = require('./middleware/serverRenderer');



const app = express();
app.use(compression());
app.set('port', 3110);
app.use(bodyParser.json());

app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));


const sequelize = new Sequelize('patientsDB', null, null, {
    dialect: "sqlite",
    storage: './db.sqlite',
});


sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });


const Patient = require('./sequelizeModels/Patient')(sequelize, Sequelize);
const db = {
    sequelize,
    Sequelize,
    models: {
        Patient
    }
}


const patientRoutes = require('./routes/patientRoutes')(db);
app.use(patientRoutes);

app.use('^/$', serverRenderer);
app.use('*', serverRenderer);


// app.get('*', function(req,res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));

// });

sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});