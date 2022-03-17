var mysql = require('mysql2'); 
 
var connection= mysql.createConnection({ 
    host: 'localhost', 
    database: 'database1', 
    user: 'root', 
    password: 'Mahi@24HCL24' 
}); 
 
module.exports = connection; 
