const express = require('express')
const app = express();
const router = express.Router();
const Op = require('sequelize').Op;

const routes = (Patient) => {

    //Requires page number in query.
    router.get('/api/patients', async (req, res) => {
        let page = req.query.page;
        if (!page) {
            res.status(400).send("Provide a page number in query");
            return;
        }
        page = parseInt(page)     // page number
        let limit = 50;   // number of records per page
        let offset = page * limit;

        try {
            let data = await Patient.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [
                    ['lastName', 'DESC']
                ]
            });
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            let patients = data.rows;
            res.status(200).json({ 'result': patients, 'count': data.count, 'pages': pages });

        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    })

    router.post('/api/patients', async (req, res) => {
        console.log(req.body);
        const body = req.body;
        try {
            let createdPatient = await Patient.create({ ...body });
            res.status(200).json(createdPatient);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });


    router.put('/api/patients', async (req,res) => {
        const p = req.body;
        if (!p.id || Object.keys(p).length < 2) {
            res.status(500).send("Internal server Error");
            return;
        }
        try {
            let numOfUpdated = await Patient.update(p, { where: {id: p.id}});
            res.status(200).json(numOfUpdated);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        
    });

    router.delete('/api/patients/:id', async (req, res) => {
        const patientId = req.params.id;
        try {
            const nOfDeleted = await Patient.destroy({where: {id: patientId}});
            res.status(200).json(nOfDeleted);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });


    router.get('/api/patients/search', async (req,res) => {
        const query = req.query.query;
        try {
            const foundPatients = await Patient.findAll({
                where: {
                    [Op.or]: {
                        fullName: {
                            [Op.like]: query
                        },
                        phone: {
                            [Op.like]: query
                        }
                    }
                }
            });
            res.status(200).json(foundPatients);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        
    })

    return router
}







module.exports = routes;