const express = require('express')
const app = express();
const router = express.Router();

const routes = (Patient) => {
    router.get('/api/patients', (req, res) => {
        let page = req.query.page; 
        page = parseInt(page)     // page number
        let limit = 50;   // number of records per page
        let offset = page * limit;

        Patient.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [
                ['lastName', 'DESC']
            ]
        }).then((data) => {
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            let patients = data.rows;
            res.status(200).json({ 'result': patients, 'count': data.count, 'pages': pages });
        })
            .catch(function (error) {
                res.status(500).send('Internal Server Error');
            });
    })

    router.post('/api/patients', (req, res) => {
        const body = req.body;
        Patient.create({ ...body })
            .then(createdPatient => {
                res.status(200).json(createdPatient);
            })
            .catch(e => {
                res.status(500).send('Internal Server Error');
            })
    });

    return router
}




module.exports = routes;