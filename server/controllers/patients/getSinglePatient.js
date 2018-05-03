const transformDateForForm = require('../../util/transformDateForForm');

module.exports = async (req, res, db) => {
    const { id } = req.params;
        try {
            let foundPatient = await db.models.Patient.findById(id);
           
            foundPatient.dataValues.birthday = transformDateForForm(foundPatient.dataValues.birthday);
            res.status(200).json(foundPatient);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
}