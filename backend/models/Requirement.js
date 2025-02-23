const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Requirement = sequelize.define('Requirement', {
    requirement_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requirement_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'requirements',
    timestamps: false
});

module.exports = Requirement;