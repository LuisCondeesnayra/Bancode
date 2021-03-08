
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Pago extends Model {}
Pago.init({
    card: DataTypes.STRING,
    nameCard: DataTypes.STRING,
    numberCard:DataTypes.INTEGER,
    dateCardMonth:DataTypes.INTEGER,
    dateCardYear:DataTypes.INTEGER,
    cvv:DataTypes.INTEGER,
    quantity:DataTypes.INTEGER
}, {
    sequelize,
    modelName: "pago"
});

module.exports = Pago;
