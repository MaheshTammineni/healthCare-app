/*require('dotenv').config() 
 
const express = require('express') 
const app = express() 
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken') 
let cors = require('cors'); 
var connection = require('./database'); 
app.use(cors()); 
 
app.use(express.json()) 
 
const users = [] 
 
app.get('/users', function(req, res){ 
    let sql = "SELECT * FROM database1.employee;" 
    connection.query(sql, function(err,results){ 
        if(err) throw err; 
        res.send(results); 
    }) 
    res.send("hai"); 
}) 
 
/*app.get('/users', (req, res) => { 
    res.json(users) 
 
}) 
 
app.post('/users', async (req, res)=>{ 
 
    const email = req.body.email 
    const e = { email: email} 
 
const accessToken = jwt.sign(e, process.env.ACCESS_TOKEN_SECRET) 
res.json({ accessToken : accessToken}) 
console.log("Access-Token"); 
console.log(accessToken) 
 
try{ 
    const salt = await bcrypt.genSalt() 
    const hashedPassword = await bcrypt.hash(req.body.password, 10) 
    console.log("Salt"); 
    console.log(salt) 
    console.log("Hashed-password"); 
    console.log(hashedPassword) 
    const user = { email: req.body.email, password: hashedPassword} 
    users.push(user) 
    res.status(201).send() 
} catch { 
    res.status(500).send() 
} 
}) 
 
app.post('/users/login', async (req, res)=>{ 
  const user = users.find(user => user.email === req.body.email) 
if(user == null){ 
    return res.status(400).send('cannot find user') 
} 
try{ 
  if(await bcrypt.compare(req.body.password, user.password)){ 
      res.send('success') 
  }else { 
      res.send('not success') 
  } 
} catch { 
    res.status(500).send() 
} 
    }) 
     
function authenticateToken(req, res, next) { 
  const authHeader = res.headers['authorization'] 
  const token = authHeader && authHeader.split(' ')[1] 
  if(token == null) return res.sendStatus(401) 
 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, e) => { 
      if(err) return res.sendStatus(403) 
      req.e= e; 
      next() 
  }) 
}  
 
app.listen(7000 , function(){ 
    console.log("server listening on port 7000"); 
    connection.connect(function(err){ 
        if(err) throw err; 
        console.log("database connected"); 
    }) 
})  */ 
 
const jwt = require('jsonwebtoken') 
const createError = require('http-errors'); 
const express = require('express'); 
const path = require('path'); 
var mysql = require('mysql2'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const indexRouter = require('./router'); 
const app = express(); 
//const fileupload = require('express-fileupload'); 
const exphb = require('express-handlebars'); 
const fileUpload = require('express-fileupload'); 
 
// default option 
app.use(fileUpload()); 
 
// Static Files 
app.use(express.static('public')); 
app.use(express.static('upload')); 
 
// Connection Pool 
const pool = mysql.createPool({ 
  connectionLimit: 10, 
  host: 'localhost', // Replace with your host name 
  user: 'root',      // Replace with your database username 
  password: 'Mahi@24HCL24',      // Replace with your database password 
  database: 'database1' // // Replace with your database Name 
}); 
 
pool.getConnection((err, connection) => { 
  if (err) throw err; // not connected 
  console.log('Connected!'); 
}); 
 
app.get('', (req, res) => { 
  pool.getConnection((err, connection) => { 
    if (err) throw err; // not connected 
    console.log('Connected!'); 
 
    connection.query('SELECT * FROM users WHERE id = "1"', (err, rows) => { 
      // Once done, release connection 
      connection.release(); 
      if (!err) { 
        //res.render('index', { rows }); 
        res.sendFile(path.join(__dirname,"src/app/dashboardmaterial/dashboardmaterial.component.html")); 
 
      } 
    }); 
 
  }); 
}); 
 
app.post('', (req, res) => { 
  let sampleFile; 
  let uploadPath; 
 
  if (!req.files || Object.keys(req.files).length === 0) { 
    return res.status(400).send('No files were uploaded.'); 
  } 
 
  // name of the input is sampleFile 
  sampleFile = req.files.sampleFile; 
  uploadPath = __dirname + './public/uploads/' + sampleFile.name; 
 
  console.log(sampleFile); 
 
  // Use mv() to place file on the server 
  sampleFile.mv(uploadPath, function (err) { 
    if (err) return res.status(500).send(err); 
 
    pool.getConnection((err, connection) => { 
      if (err) throw err; // not connected 
      console.log('Connected!'); 
 
      connection.query('UPDATE users SET profile_image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => { 
        // Once done, release connection 
        connection.release(); 
 
        if (!err) { 
          res.redirect('/'); 
        } else { 
          console.log(err); 
        } 
 
      }); 
    }); 
 
    // res.send('File uploaded!'); 
  }); 
});  
const multer = require('multer'); 
const ejs = require('ejs'); 
 
const fileStorageEngine = multer.diskStorage({ 
    destination: (req, file, cb) =>{ 
        cb(null,"./public/uploads/"); 
    }, 
    filename: (req, file, cb) => { 
      cb(null,Date.now() +"--" +file.originalname); 
    } 
  }); 
 
const upload = multer({ storage: fileStorageEngine}); 
app.get("/", (req,res) =>{ 
    res.sendFile(path.join(__dirname,"src/app/dashboardmaterial/dashboardmaterial.component.html")); 
}); 
app.post("/single", upload.single("image"),(req,res) => { 
    console.log(req.file); 
    res.send("single file upload"); 
}); 
// Set The Storage Engine 
/*const storage = multer.diskStorage({ 
  destination: './public/uploads/', 
  filename: function(req, file, cb){ 
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  } 
}); 
 
// Init Upload 
const upload = multer({ 
  storage: storage, 
  limits:{fileSize: 1000000}, 
  fileFilter: function(req, file, cb){ 
    checkFileType(file, cb); 
  } 
}).single('myImage'); 
 
// Check File Type 
function checkFileType(file, cb){ 
  // Allowed ext 
  const filetypes = /jpeg|jpg|png|gif/; 
  // Check ext 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 
  // Check mime 
  const mimetype = filetypes.test(file.mimetype); 
 
  if(mimetype && extname){ 
    return cb(null,true); 
  } else { 
    cb('Error: Images Only!'); 
  } 
} 
 
// EJS 
app.set('view engine', 'ejs'); 
 
// Public Folder 
app.use(express.static('./public')); 
 
app.get('/', (req, res) => res.render('index')); 
 
app.post('/upload', (req, res) => { 
  upload(req, res, (err) => { 
    if(err){ 
      res.render('index', { 
        msg: err 
      }); 
    } else { 
      if(req.file == undefined){ 
        res.render('index', { 
          msg: 'Error: No File Selected!' 
        }); 
      } else { 
        res.render('index', { 
          msg: 'File Uploaded!', 
          file: `uploads/${req.file.filename}` 
        }); 
      } 
    } 
  }); 
}); */ 
 
 
 
 
/*app.engine('hbs', exphbs({extname: '.hbs'})); 
app.set('view engine', 'hbs'); 
app.get('', (req,res)=>{ 
    res.render('dashboardmaterial'); 
});*/ 
 
//app.use(fileupload()); 
/*app.post('', (req, res)=>{ 
    let sampleFile; 
    let uploadPath; 
    if(!req.files || Object.keys(req.files).length === 0){ 
        return res.status(400).send('No files were uploaded'); 
    } 
    sampleFile = req.files.sampleFile; 
    uploadPath = __dirname + '/upload1' + sampleFile.name; 
    console.log(sampleFile); 
     
    sampleFile.mv(uploadPath, function(err){ 
        if(err) return res.status(500).send(err); 
        res.send('file upload!'); 
    }); 
    }); */ 
app.use(express.json()); 
  
app.use(bodyParser.json()); 
 
app.use(bodyParser.urlencoded({ 
    extended: true 
})); 
  
app.use(cors()); 
  
app.use('/api', indexRouter); 
  
// Handling Errors 
app.use((err, req, res, next) => { 
    // console.log(err); 
    err.statusCode = err.statusCode || 500; 
    err.message = err.message || "Internal Server Error"; 
    res.status(err.statusCode).json({ 
      message: err.message, 
    }); 
}); 
  
app.listen(7001,() => console.log('Server is running on port 7001')); 
