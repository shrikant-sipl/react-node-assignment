var User = require('../models/UserModel')
var multer = require('multer');
var fileName = "";
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
        fileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, fileName);
    }
});
var upload = multer({
    storage: Storage
}).array("file", 3); //Field name and max count



module.exports = {

    getAllUser: (req, res, next) => {

        //Initialize all Body Object ATtributes in variables
        let pageNo = Number(req.body.pageNo);
        let skipBy = (pageNo - 1) * 10;
        let searchBy = req.body.searchBy;
        let searchFor = req.body.searchFor;
        let sortBy = req.body.sortBy;
        let sortType = req.body.sortType;
        let pageLimit = req.body.pageLimit;

        /**
         * Query for Search in Fields
         */
        var query = {
            $or: [
                { firstName: { $regex: searchFor, $options: 'i' } },
                { userName: { $regex: searchFor, $options: 'i' } },
                { name: { $regex: searchFor, $options: 'i' } },
                { lastName: { $regex: searchFor, $options: 'i' } },
                { email: { $regex: searchFor, $options: 'i' } },
                { contact: { $regex: searchFor, $options: 'i' } },
            ]
        }

        //var regexp = new RegExp("^" + searchFor);
        // let findStr = (searchFor === "" ? {} : { [searchBy]: regexp });

        //Set Conditional Initialzation of Attributes
        let findStr = (searchFor === "" ? {} : query);
        let skipStr = Number(pageNo === "" ? 1 : skipBy);
        let sortTypeStr = Number(sortType === "" ? -1 : sortType);
        let pageLimitStr = Number(pageLimit === "" ? 10 : pageLimit);

        /**
         * Mongoose Query
         * Find in a User Model applied with - search , sort , limit ,skip functionalities
         */
        User.find(findStr, function (err, data) {
            if (err) {
                console.log("err ", err)
                res.status(400).send({ error: "Data Not Found" })
            } else {
                if (data.length === 0) {
                    res.status(204)
                }
                res.status(200).send(data)
            }
        }).sort({ [sortBy]: sortTypeStr }).skip(skipStr)
    },
    getUser: (req, res, next) => {

        /**
         * Mongoose Query
         * Find in a User Model applied with - search , sort , limit ,skip functionalities
         */
        User.find({ id: req.body.id }, function (err, data) {
            if (err) {
                console.log("err ", err)
                res.status(400).send({ error: "Data Not Found" })
            } else {
                res.status(200).send(data)
            }
        })
    },

    createUser: async (req, res) => {
        let body = req.body;
        var newUser = new User(body);
        await newUser.save(function (err) {

            //duplicate key
            if (err && err.code === 11000) {
                res.status(300).send("duplicate Key Error")
            }
            else if (err && err.code !== 11000) {
                // console.log(err)
                res.status(400).send("Error")
            }
            else {
                res.status(200).send("user created")
            }
        })
    },
    updateUser: (req, res, next) => {
        let body = req.body;
        let userId = body.userId;
        let newValue = body.values;
        if(!newValue.profileImage){
            delete newValue.profileImage
        }
        console.log(newValue)
        User.findByIdAndUpdate({ _id: userId },  newValue , function (err, data) {
            if (err) {
                console.log("err ", err)
                res.status(400).send({ error: "Data Not Found" })
            } else {
                res.status(200).send(data)
            }
        })
    },
    uploadImage: (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                console.log(err, "error")
                return res.end("Something went wrong!");
            }
            return res.send({ fileName: fileName }).status(200)
        });
    },

}