module.exports = async (req, res, db) => {
    const { query } = req.query;
    const { Op } = db.sequelize;
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
                order: [
                    ['lastName', 'ASC']
                ],
                limit: 10,
            });
            res.status(200).json(foundPatients);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
}