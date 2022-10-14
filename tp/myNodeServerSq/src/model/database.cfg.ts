export default{
"dev": {
	"dialect": "sqlite",
	"host": null,
	"port": null,
	"database": "sq-test.db",
	"user": null,
	"password": null,
	"storage" : "sq-test.db"
	},
"prod": {
		"dialect": "postgres",
		"host": "localhost",
		"port": 5432,
		"database": "myDb",
		"user": "postgres",
		"password": "root",
		"storage" : null
		}
}

/*
"prod": {
	"dialect": "mysql",
	"host": "devise.db.service",
	"port": 3306,
	"database": "deviseApiDb",
	"user": "root",
	"password": "root"
	 }
*/