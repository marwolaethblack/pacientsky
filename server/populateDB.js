//Populates the database with 250 000 random patient records

const faker = require('faker');
const axios = require('axios');
const Sequelize = require('sequelize');


const populate = async (Patient) => {
    let medicine = null;
    try {
        medicine = await axios.get(`https://fest-searcher.herokuapp.com/api/fest/s/as`);
        medicine = medicine.data;
        let data = [];
        //Do 5 runs of 50 000 bulk inserts to not run out of heap memory
        for (let index = 0; index < 5; index++) {
            for (let i = 0; i < 50000; i++) {
                firstName = faker.name.firstName();
                lastName = faker.name.lastName();
                fullName = firstName + " " + lastName;
                email = faker.internet.email();
                birthday = faker.date.past();
                phone = faker.phone.phoneNumber();
                //Get random medicine from medicine array
                medIndex = Math.floor(Math.random() * medicine.length);
                let patient = {firstName, lastName,fullName, email, birthday, phone, medicine: medicine[medIndex]};
                data.push(patient);  
           }
           let p = await Patient.bulkCreate(data);
           data = [];
        } 
    }
    catch(err) {
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


