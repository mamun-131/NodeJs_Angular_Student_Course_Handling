const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseCode: {
        type: String,
        // Validate 'courseCode' value existance
        required: 'Course code is required',
        // Trim the 'courseCode' field
        trim: true
    },
    courseName: {
        type: String,
        trim: true,
        required: 'Course name cannot be blank'
    },
    section: {
        type: String,
        trim: true,
        required: 'Section cannot be blank'
    },
    semester: {
        type: String,
        trim: true,
        required: 'Semester cannot be blank'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('Article', ArticleSchema);
