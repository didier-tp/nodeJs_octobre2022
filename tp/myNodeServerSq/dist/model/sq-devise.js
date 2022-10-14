"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDeviseModel = void 0;
const sequelize_1 = require("sequelize");
function initDeviseModel(sequelize) {
    const DeviseDefineModel = sequelize.define('devise', {
        code: { type: sequelize_1.DataTypes.STRING(32), autoIncrement: false, primaryKey: true },
        nom: { type: sequelize_1.DataTypes.STRING(64), allowNull: false },
        change: { type: sequelize_1.DataTypes.DOUBLE, allowNull: false }
    }, {
        freezeTableName: true,
    });
    return DeviseDefineModel;
}
exports.initDeviseModel = initDeviseModel;
