module.exports = async (req,res,db) => {
    const patientId = req.params.id;
        try {
            const nOfDeleted = await db.models.Patient.destroy({where: {id: patientId}});
            res.status(200).json(nOfDeleted);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
}