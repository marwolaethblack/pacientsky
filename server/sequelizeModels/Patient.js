const Patient = (sequelize, Sequelize) => {
    return sequelize.define("Patient", {
        id: {
            type: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        medicine: Sequelize.JSON
    })
}

module.exports = Patient;