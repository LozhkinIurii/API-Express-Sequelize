const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
});


const Phone = sequelize.define('Phone', {
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'phones',
    timestamps: false
});


module.exports = Phone;