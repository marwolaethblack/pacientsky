module.exports = async (req,res,db) => {
    const body = req.body;
    try {
        let createdPatient = await db.models.Patient.create({ ...body });
        res.status(200).json(createdPatient);
    }
    catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}