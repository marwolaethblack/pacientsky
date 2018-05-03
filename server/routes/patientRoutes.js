const express = require('express')
const app = express();
const router = express.Router();
const Op = require('sequelize').Op;

//Controllers
const getPaginatePatients = require('../controllers/getPaginatePatients');
const getSinglePatient = require('../controllers/getSinglePatient');
const createPatient = require('../controllers/createPatient');
const editPatient = require('../controllers/editPatient');
const deletePatient = require('../controllers/deletePatient');
const searchPatients = require('../controllers/searchPatients');

const routes = (db) => {

    //Requires page number in query.
    router.get('/api/patients', async (req, res) => {
        await getPaginatePatients(req,res,db);
    })


    router.get('/api/patients/:id', async (req,res) => {
        await getSinglePatient(req,res,db);  
    });

    router.post('/api/patients', async (req, res) => {
       await createPatient(req,res,db);
    });


    router.put('/api/patients', async (req,res) => {
        await editPatient(req,res,db);
    });

    router.delete('/api/patients/:id', async (req, res) => {
        await deletePatient(req,res,db);
    });


    router.get('/api/patients/search', async (req,res) => {
        await searchPatients(req,res,db);
    })

    return router
}







module.exports = routes;