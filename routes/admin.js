const { Router, json } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course} = require("../db")
const router = Router();

const {JWT_SECRET} = require("../config")
const jwt = require('jsonwebtoken')

// Admin Routes
// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }
router.post('/signup',async (req, res) => {
    const {username,password} = req.body;
    await Admin.create({
        username : username,
        password : password
    })
    res.status(202).json({
        msg : "Admin created"
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const uesrFind =await Admin.findOne({username : username, password : password});
    if(uesrFind){
        const token = jwt.sign({username},JWT_SECRET);
        console.log(token);
    }else{
        res.status(404).json({
            msg : "Please Enter the valid data"
        })
    }
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const {title , description , price , imageLink} = req.body;
    const newCourse = await Course.create({
        title : title,
        description : description,
        price : price,
        imageLink : imageLink
    });
    res.json({
        msg : "Course crated " , courseId : newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourse = await Course.find({});
    res.json({
        course: allCourse
    })
});

module.exports = router;