"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSequelize = exports.sequelize = exports.models = exports.database = exports.MySqDatabase = exports.MyApiModels = void 0;
const sequelize_1 = require("sequelize");
const sq_devise_1 = require("./sq-devise");
const db_config_1 = require("./db-config");
//import { PaysModelStatic , initPaysModel } from "./sq-pays";
class MyApiModels {
}
exports.MyApiModels = MyApiModels;
class MySqDatabase {
    constructor() {
        this.dbname = "unknown";
        this.models = new MyApiModels();
        let model;
        let sqOptions = {
            dialect: db_config_1.confDb.dialect,
            port: db_config_1.confDb.port,
            host: db_config_1.confDb.host,
            logging: /*console.log*/ false,
            define: {
                timestamps: false
            }
        };
        var password = db_config_1.confDb.password ? db_config_1.confDb.password : "";
        this.sequelize = new sequelize_1.Sequelize(db_config_1.confDb.database, db_config_1.confDb.user, password, sqOptions);
        this.dbname = db_config_1.confDb.database;
        this.models.devises = (0, sq_devise_1.initDeviseModel)(this.sequelize);
        //this.models.pays= initPaysModel(this.sequelize);
        /*
        model = this.sequelize.import('./AUTRE_OBJET');
        this.models.autreObjets = model as SequelizeStatic.Model<.., ...>;
        this.models.autreObjets.belongsTo(this.models.objets, { foreignKey: 'OBJET_ID' });
        */
        /* import automatique
        fs.readdirSync(__dirname).filter((file: string) => {
        return (file !== this._basename) && (file !== "iface");
        }).forEach((file: string) => {
        let model = this._sequelize.import(path.join(__dirname, file));
        console.log(`importing ${path.join(__dirname, file)}`);
        this._models[(model as any).name] = model;
        });
    
        Object.keys(this._models).forEach((modelName: string) => {
        if (typeof this._models[modelName].associate === "function") {
            this._models[modelName].associate(this._models);
        }
        });
        */
    }
    getModels() {
        return this.models;
    }
    getSequelize() {
        return this.sequelize;
    }
}
exports.MySqDatabase = MySqDatabase;
exports.database = new MySqDatabase();
exports.models = exports.database.getModels();
exports.sequelize = exports.database.getSequelize();
function initSequelize() {
    exports.sequelize.sync({ logging: console.log })
        .then(() => {
        console.log("sequelize is initialized");
    }).catch((err) => { console.log('An error occurred :', err); });
}
exports.initSequelize = initSequelize;
