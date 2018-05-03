const transformDate = require('../../util/transformDate');

module.exports = async (req,res, db) => {
    let { page } = req.query;
        if (!page) {
            res.status(400).send("Provide a page number in query");
            return;
        }
        page = parseInt(page)     // page number
        let limit = 25;   // number of records per page
        let offset = page * limit;

        try {
            let data = await db.models.Patient.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [
                    ['lastName', 'ASC']
                ],
                attributes: ["id", "fullName", "email", "phone", "birthday"]
            });
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            let patients = data.rows;

            //Transform date to a readable format
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            patients.forEach(p => {
                p.dataValues.birthday = transformDate(p.dataValues.birthday);
            });
            
            res.status(200).json({ 'result': patients, 'count': data.count, 'pages': pages });

        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
}