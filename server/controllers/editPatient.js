module.exports = async (req,res,db ) => {
    const p = req.body;
        if (!p.id || Object.keys(p).length < 2) {
            res.status(500).send("Internal server Error");
            return;
        }
        try {
            let numOfUpdated = await db.models.Patient.update(p, { where: {id: p.id}});
            res.status(200).json(numOfUpdated);
        }
        catch(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } 
}