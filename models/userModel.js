const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
});


class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    first: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
});


module.exports = User;
