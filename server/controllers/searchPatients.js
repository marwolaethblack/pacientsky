module.exports = async (req, res, db) => {
    const { query } = req.query;
        if (!query) {
            res.status(400).send("Provide a query to search");
            return;
        }
        try {
            const foundPatients = await db.models.Patient.findAll({
                attributes: ['fullName', 'id', 'email', 'phone'],
                where: {
                    [Op.or]: {
                        fullName: {
                            [Op.like]: "%"+query+"%"
                        }
                    }
                },
                limit: 10,
            });
            res.status(200).json(foundPatients);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
}