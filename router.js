const express = require('express'); 
const router = express.Router(); 
const db  = require('./src/dbConnection'); 
const { signupValidation, loginValidation } = require('./validation'); 
const { validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
 
router.post('/dashboardmaterial1', function(req, res, next){ 
    // Add a new a profile 
    db.query( 
    `INSERT INTO labdata(bp, hrate, bglucose, gtest, igf, tsh) VALUES ('${req.body.bp}','${req.body.hrate}','${req.body.bglucose}','${req.body.gtest}','${req.body.igf}','${req.body.tsh}')`, 
    (err, result) => { 
    if (err) { 
    throw err; 
    return res.status(400).send({ 
    msg: err 
    }); 
    } 
    } 
    ); 
    });   
    // Retrieve all users  
    router.get('/dashboardmaterial1', function (req, res) { 
    db.query('SELECT * FROM labdata', function (error, results, fields) { 
    if (error) throw error; 
    return res.send({ error: false, data: results, message: 'growth list.' }); 
    }); 
    }); 
    router.put('/dashboardmaterial1/:id', (req, res) => { 
    db.query('UPDATE labdata SET bp=?, hrate=?, bglucose=?, gtest=?, igf=?, tsh=? WHERE id = ?', [req.body.bp,req.body.hrate,req.body.bglucose,req.body.gtest,req.body.igf,req.body.tsh,req.params.id], (err, rows, fields) => { 
    if (!err) 
    res.send('Learner Record update successfully.'); 
    else 
    console.log(err); 
    }) 
    }); 
     
//post profile 
router.post('/dashboardmaterial', function(req, res, next){ 
    // Add a new a profile 
    db.query( 
    `INSERT INTO profile(fname, lname, age, pname, rname, gender, mobile, email, address, insurance) VALUES ('${req.body.fname}','${req.body.lname}','${req.body.age}','${req.body.pname}','${req.body.rname}','${req.body.gender}','${req.body.mobile}','${req.body.email}','${req.body.address}','${req.body.insurance}')`, 
    (err, result) => { 
    if (err) { 
    throw err; 
    return res.status(400).send({ 
    msg: err 
    }); 
    } 
    } 
    ); 
    });   
 
    router.get('/getuserdetails', function (req, res) { 
        db.query('select * from users order by last_login desc LIMIT 1;', function (error, results, fields) { 
        if (error) throw error; 
        return res.send({ error: false, data: results, message: 'growth list.' }); 
        }); 
        }); 
         
    // Retrieve all users  
    router.get('/dashboardmaterial', function (req, res) { 
    db.query('SELECT * FROM profile', function (error, results, fields) { 
    if (error) throw error; 
    return res.send({ error: false, data: results, message: 'growth list.' }); 
    }); 
    }); 
    router.put('/dashboardmaterial/:id', (req, res) => { 
    db.query('UPDATE profile SET fname=?, lname=?, age=?, pname=?, rname=?, gender=?, mobile=?, email=?, address=?, insurance=? WHERE id = ?', [req.body.fname,req.body.lname,req.body.age,req.body.pname,req.body.rname,req.body.gender,req.body.mobile,req.body.email,req.body.address,req.body.insurance,req.params.id], (err, rows, fields) => { 
    if (!err) 
    res.send('Learner Record update successfully.'); 
    else 
    console.log(err); 
    }) 
    }); 
     
     
 
//post growth 
router.post('/growthmain', function(req, res, next){ 
// Add a new a growth  
db.query( 
`INSERT INTO growthdata(datewithtime,height, weight,hdiff, wdiff) VALUES ('${req.body.datewithtime}','${req.body.height}','${req.body.weight}','${req.body.hdiff}','${req.body.wdiff}')`, 
(err, result) => { 
if (err) { 
throw err; 
return res.status(400).send({ 
msg: err 
}); 
} 
} 
); 
});   
// Retrieve all users  
router.get('/growthmain', function (req, res) { 
db.query('SELECT * FROM growthdata', function (error, results, fields) { 
if (error) throw error; 
return res.send({ error: false, data: results, message: 'growth list.' }); 
}); 
}); 
 
//  Delete user 
//Router to DELETE a learner's detail 
router.delete('/growthmain/:id', (req, res) => { 
db.query('DELETE FROM growthdata WHERE id = ?', [req.params.id], (err, rows, fields) => { 
if (!err) 
res.send('Learner Record deleted successfully.'); 
else 
console.log(err); 
}) 
}); 
 
 
//post appoint 
router.post('/addnewappoint', function(req, res, next){ 
// Add a new a growth  
db.query( 
`INSERT INTO appointdata(appointdate,location, doctor, timeslot,department,payment) VALUES ('${req.body.appointdate}','${req.body.location}','${req.body.doctor}','${req.body.timeslot}','${req.body.department}','${req.body.payment}')`, 
(err, result) => { 
if (err) { 
throw err; 
return res.status(400).send({ 
msg: err 
}); 
} 
} 
); 
});   
// Retrieve all users  
router.get('/appointmentmat', function (req, res) { 
db.query('SELECT * FROM appointdata', function (error, results, fields) { 
if (error) throw error; 
return res.send({ error: false, data: results, message: 'growth list.' }); 
}); 
}); 
 
//  Delete user 
//Router to DELETE a learner's detail 
router.delete('/appointmentmat/:id', (req, res) => { 
db.query('DELETE FROM appointdata WHERE id = ?', [req.params.id], (err, rows, fields) => { 
if (!err) 
res.send('Learner Record deleted successfully.'); 
else 
console.log(err); 
}) 
}); 
 
router.put('/appointmentmat/:id', (req, res) => { 
    db.query('UPDATE appointdata SET appointdate=?,location=?, doctor=?, timeslot=? WHERE id = ?', [req.body.appointdate,req.body.location,req.body.doctor,req.body.timeslot,req.params.id], (err, rows, fields) => { 
    if (!err) 
    res.send('Learner Record deleted successfully.'); 
    else 
    console.log(err); 
    }) 
    }); 
//router.put('/appointmentmat',function (req, res) {let user_id = req.body.user_id;let user = req.body.user;if (!user_id || !user) {return res.status(400).send({ error: user, message:'Please provide user and user_id' });}dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id],function (error, results, fields) {if (error)throw error;return res.send({ error:false, data: results, message:'user has been updated successfully.' });});}); 
 
router.post('/register', signupValidation, (req, res, next) => { 
db.query( 
`SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape( 
req.body.email 
)});`, 
(err, result) => { 
if (result.length) { 
return res.status(409).send({ 
msg: 'This user is already in use!' 
}); 
} else { 
// username is available 
bcrypt.hash(req.body.password, 10, (err, hash) => { 
if (err) { 
return res.status(500).send({ 
msg: err 
}); 
} else { 
// has hashed pw => add to database 
db.query( 
`INSERT INTO users (name, email, password, gender, age, mobilenumber) VALUES ('${req.body.name}', ${db.escape(req.body.email)}, ${db.escape(hash)}, '${req.body.gender}','${req.body.age}','${req.body.mobile}')`, 
(err, result) => { 
if (err) { 
throw err; 
return res.status(400).send({ 
msg: err 
}); 
} 
return res.status(201).send({ 
msg: 'The user has been registerd with us!' 
}); 
} 
); 
} 
}); 
} 
} 
); 
}); 
router.post('/loginnew', loginValidation, (req, res, next) => { 
db.query( 
`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`, 
(err, result) => { 
// user does not exists 
if (err) { 
console.log(err); 
throw err; 
return res.status(400).send({ 
msg: err 
}); 
} 
if (!result.length) { 
return res.status(401).send({ 
msg: 'Email  or password is incorrect!', 
 
}); 
} 
// check password 
bcrypt.compare( 
req.body.password, 
result[0]['password'], 
(bErr, bResult) => { 
// wrong password 
if (bErr) { 
throw bErr; 
return res.status(401).send({ 
msg: 'Email or password is incorrect!' 
}); 
} 
if (bResult) { 
const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' }); 
db.query( 
`UPDATE users SET last_login = NOW() WHERE id = '${result[0].id}'` 
); 
return res.status(200).send({ 
msg: 'Logged in!', 
token, 
user: result[0] 
}); 
} 
return res.status(401).send({ 
msg: 'password is incorrect!', 
 
}); 
 
} 
); 
} 
); 
}); 
router.post('/get-user', signupValidation, (req, res, next) => { 
if( 
!req.headers.authorization || 
!req.headers.authorization.startsWith('Bearer') || 
!req.headers.authorization.split(' ')[1] 
){ 
return res.status(422).json({ 
message: "Please provide the token", 
}); 
} 
const theToken = req.headers.authorization.split(' ')[1]; 
const decoded = jwt.verify(theToken, 'the-super-strong-secrect'); 
db.query('SELECT * FROM users where id=?', decoded.id, function (error, results, fields) { 
if (error) throw error; 
return res.send({ error: false, data: results[0], message: 'Fetch Successfully.' }); 
}); 
}); 
module.exports = router; 
