const mongoose = require('mongoose');
const Article = mongoose.model('Article');
let studentId;
//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const article = new Article(req.body);
    article.creator = req.user;
    article.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//
exports.list = function (req, res) {
    var query = { creator: { _id: studentId}};
    Article.find().sort('-created').populate('creator', 'idSeleted firstName lastName fullName').exec((err, articles) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(articles);
    }
});
};

// exports.listStudent = function (req, res) {
//     console.log("listStudent");
//     console.log(studentId);
    
//     var query = { creator: { _id: studentId}};
//     Article.find(query).sort('-created').populate('creator', 'idSeleted firstName lastName fullName').exec((err, article) => {
// if (err) {
//         return res.status(400).send({
//             message: getErrorMessage(err)
//         });
//     } else {
//         res.status(200).json(article);
//     }
// });
// };

// exports.listByCreator = function (req, res) {
//     const userId = req.params.articleId;
//     //let
//     let query = { creator: { _id: userId}};
//     Article.find(query).sort('-created').populate('creator', 'idSeleted firstName lastName fullName').exec((err, articles) => {
//         console.log(articles);
//         if (err) {
//         return res.status(400).send({
//             message: getErrorMessage(err)
//         });
//     } else {
//         res.status(200).json(articles);
//     }
// });
// };

//
exports.articleByID = function (req, res, next, id) {
    console.log(id);
    Article.findById(id).populate('creator', 'idSeleted firstName lastName fullName').exec((err, article) => {if (err) return next(err);
        console.log(article);
        if (!article) return next(new Error('Failed to load article '
        + id));
    req.article = article;
    next();
});
};

exports.articleByCourseID = function (req, res, next, id) {
    console.log(id);
    Article.find({courseCode: id}).populate('creator', 'idSeleted firstName lastName fullName').exec((err, article) => {if (err) return next(err);
      //  console.log(article);
        if (!article) return next(new Error('Failed to load article '
        + id));
    req.article = article;
    next();
    console.log(req.article);
   
});
};

exports.articleByStudentID = function (req, res, next, id) {
    studentId = id;
   console.log(id);
   // let query = {creator: { _id: id}};
    var query = { creator: { _id: id}};
    Article.find(query).populate('creator', 'idSeleted firstName lastName fullName').exec((err, article) => {if (err) return next(err);
        console.log(article);
        if (!article) return next(new Error('Failed to load article '
        + id));
    req.article = article;
    next();
   console.log(req.article);
   
});
};
//
exports.read = function (req, res) {
    res.status(200).json(req.article);
};
//
exports.update = function (req, res) {
    const article = req.article;
    article.courseCode = req.body.courseCode;
    article.courseName = req.body.courseName;
    article.section = req.body.section;
    article.semester = req.body.semester;
    article.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//
exports.delete = function (req, res) {
    const article = req.article;
    article.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(article);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log(req.article.creator.id);
    console.log(req.user.id);
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


