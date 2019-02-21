var nodemailer = require("nodemailer");
const User = require('../models/UserModel')

module.exports = {

    /**
     * @name loginUser
     * @param {Request , Response ,done }
     * @desc  Authenticate the valid user
     */
    loginUser: async (req, res, done) => {
        let body = req.body;
        let email = body.email;
        try {
            // email & password exist 
            if (body.email && body.password) {

                //check the user by its unique email
                var user = await User.findOne({ 'email': email })

                //if not a user then return a status 400
                if (user === null) {
                    res.status(400).send({ error: "user not availabel" });
                }

                //if valid user then match details from database 
                if (user && (user.email === body.email && user.password === body.password)) {

                    // send a status 200
                    res.status(200).send({ user: user });
                } else {
                    // if  user not match send 400 status
                    res.status(400).send({ error: "Invalid User" });

                }
            } else {
                return res.send("fill all fields");
            }
        } catch (error) {
            return done(error);
        }

    }
}