//Populates the database with 250 000 random patient records

const faker = require('faker');
const axios = require('axios');
const Sequelize = require('sequelize');


const populate = async (Patient) => {
    let medicine = null;
    try {
        medicine = await axios.get(`https://fest-searcher.herokuapp.com/api/fest/s/as`);
        medicine = medicine.data;
        const patientsPerIteration = process.argv.slice(2)[0];
        let data = [];
        //Do 5 runs of 50 000 bulk inserts to not run out of heap memory
        for (let index = 0; index < 5; index++) {
            for (let i = 0; i < patientsPerIteration; i++) {
                let firstName = faker.name.firstName();
                let lastName = faker.name.lastName();
                let fullName = firstName + " " + lastName;
                let email = faker.internet.email();
                let birthday = faker.date.past();
                let phone = faker.phone.phoneNumber();
                //Get random medicine from medicine array
                let med = [];
                medIndex = Math.floor(Math.random() * medicine.length);
                med.push(medicine[medIndex]); 
                medIndex = Math.floor(Math.random() * medicine.length);
                med.push(medicine[medIndex]);
                let patient = {firstName, lastName,fullName, email, birthday, phone, medicine: med};
                data.push(patient);  
           }
           let p = await Patient.bulkCreate(data);
           data = [];
        } 
    }
    catch(err) {
        console.log(err);
        return err;
    }

    
}

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
sequelize.sync()
    .then(() => populate(Patient))
    .catch(err => console.log(err))

