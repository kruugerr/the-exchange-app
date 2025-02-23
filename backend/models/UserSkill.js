const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserSkill = sequelize.define('UserSkill', {
    user_skill_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'skills',
            key: 'skill_id'
        }
    }
}, {
    tableName: 'user_skills',
    timestamps: false
});

module.exports = UserSkill;