const express = require('express')
const app = express();
const router =  express.Router();
const Op = require('sequelize').Op;

//Controllers
const getPaginatePatients = require('../controllers/patients/getPaginatePatients');
const getSinglePatient = require('../controllers/patients/getSinglePatient');
const createPatient = require('../controllers/patients/createPatient');
const editPatient = require('../controllers/patients/editPatient');
const deletePatient = require('../controllers/patients/deletePatient');
const searchPatients = require('../controllers/patients/searchPatients');

const routes = (db) => {

    //Requires page number in query.
    router.get('/api/patients', (req, res) => {
         getPaginatePatients(req,res,db);
    })

    router.get('/api/patients/search', (req,res) => {
        searchPatients(req,res,db);
    })

    router.get('/api/patients/:id', (req,res) => {
         getSinglePatient(req,res,db);  
    });

    router.post('/api/patients', (req, res) => {
         createPatient(req,res,db);
    });

    router.put('/api/patients', (req,res) => {
         editPatient(req,res,db);
    });

    router.delete('/api/patients/:id', (req, res) => {
         deletePatient(req,res,db);
    });
    

    return router
}







module.exports = routes;