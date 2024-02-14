const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://assignment:rniAQJsMKDagTTYb@cluster0.yktrtu5.mongodb.net/assignment_auth');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password : String,
    purchasedCourse : [{
        title : String,
        description : String,
        price : Number,
        imageLink : String
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageLink : String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}