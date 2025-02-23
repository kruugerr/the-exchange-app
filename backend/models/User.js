const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING(100), allowNull: false},
    last_name: {type: DataTypes.STRING(100), allowNull: false},
    password_hash: {type: DataTypes.STRING(255), allowNull: false},
    email: {type: DataTypes.STRING(100), allowNull: false, unique: true},
    is_host: {type: DataTypes.BOOLEAN, defaultValue: false},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;