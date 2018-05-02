const Patient = (sequelize, Sequelize) => {
    return sequelize.define("Patient", {
        id: {
            type: Sequelize.UUIDV4,
            allowNull: false
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
