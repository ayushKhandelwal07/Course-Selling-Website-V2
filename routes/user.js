const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {JWT_SECRET} = require("../config")
const {User , Course} = require("../db")
const jwt = require("jsonwebtoken")

// - POST /users/signup
//   Description: Creates a new user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }
// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const {username , password} = req.body
    await User.create({
        username : username,
        password : password,
        purchasedCourse : []
    });
    res.json({
        msg: "User created successfully"
    })

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const {username , password} = req.body;
    const userFind = User.findOne({username : username , password :password})
    if(userFind){
        const token = jwt.sign({username:username},JWT_SECRET)
        console.log(token);
    }else{
        res.status(404).json({
            msg:"Please enter the valid data"
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourse =await Course.find({});
    res.json({
        course : allCourse
    })
});

// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { message: 'Course purchased successfully' }
router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    // const {username,password } = req.headers
    // const courseId = req.params.courseId

    // const course = await Course.find({
    //     _id : courseId
    // })
    // const user = User.find({username : username , password : password});
    // await User.updateOne({username : username , password : password},course)
    // res.json({
    //     msg : "COurse Purchased for user"
    //})
    const { username, password } = req.headers;
    const courseId = req.params.courseId;
    
    const course = await Course.findOne({
      _id: courseId,
    });
    const user = await User.findOne({ username: username, password: password });
    user.purchasedCourse.push(course);
    await User.updateOne({ username: username, password: password }, user);
    res.json({ message: "Course purchased successfully" });
});

// - GET /users/purchasedCourses
//   Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const {username} = req.headers

    const user = await User.findOne({username })
    res.json({
        allPurchasedCourse : user.purchasedCourse
    });

});

module.exports = router