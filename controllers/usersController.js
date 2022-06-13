const { findById } = require('../models/User');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = config;
class UsersController {
    getAll(req, res, next) {
        User.find({}, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })
    };

    get(req, res, next) {
        let { id } = req.params;
        User.findById(id, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response);

        })

    }


    post(req, res, next) {
        let body = req.body
        let user = new User(body);
        user.save((err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    put(req, res, next) {
        let { id } = req.params;
        let body = req.body;
        User.updateOne({ _id: id }, {
            $set: body
        }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });
    }

    delete(req, res, next) {
        let { id } = req.params;
        User.deleteOne({ _id: id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send(response)
        });

    }

    async register(req, res) {
        const { userName, email, password } = req.body;

        // Simple validation
        if (!userName || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        try {
            const user = await User.findOne({ email });
            if (user) throw Error('User already exists');

            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');

            const hash = await bcrypt.hash(password, salt);
            if (!hash) throw Error('Something went wrong hashing the password');

            const newUser = new User({
                userName,
                email,
                password: hash
            });

            const savedUser = await newUser.save();
            if (!savedUser) throw Error('Something went wrong saving the user');

            let payload = { userId: savedUser.id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });

            await User.updateOne({ _id: savedUser.id }, {
                $set: { "Token": token }
            }, (err, response) => {
                if (err) return next(err);
            });

            User.findById(savedUser.id, (err, response) => {
                if (err) return next(err);
                res.status(200).send(response);

            })


        } catch (e) {
            res.status(400).json({ error: e.message });
        }

    };

    async login(req, res) {
        const { email, password } = req.body;
        console.log(email, password)
        // Simple validation
        if (!email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        try {
            // Check for existing user
            const user = await User.findOne({ email });
            if (!user) throw Error('User does not exist');

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw Error('Invalid credentials');

            let payload = { id: user._id };
            let token = jwt.sign(payload, "randomString", { expiresIn: 10000 });
            if (!token) throw Error('Couldnt sign the token');

            await User.updateOne({ _id: user._id }, {
                $set: { "Token": token }
            }, (err) => {
                if (err) return next(err);
            });

            User.findById(user.id, (err, response) => {
                if (err) return next(err);
                res.status(200).send(response);

            })
        } catch (e) {
            res.status(400).json({ msg: e.message });
        }
    };

    async logoutAction(req, res, next) {
        let { id } = req.params;
        try {
            // remove token for user record
            User.updateOne({ _id: id }, {
                $set: { "Token": null }
            }, (err, response) => {
                if (err) return next(err);
            });
            return res.status(200).send({ message: "logged out successfully" })
        } catch (e) {
            res.status(400).json({ msg: e.message });
        }
    }

    getByCategorie(req, res, next) {
        let { id, city } = req.params
        User.find({ categorie: id, city: city }, (err, response) => {
            if (err) return next(err);
            if (!response.length) {
                return res.status(200).send({ message: "No service provider in this categorie." });
            }
            res.status(200).send(response);

        })
    };

    getByCity(req, res, next) {
        let { city } = req.params
        User.find({ city: city }, (err, response) => {
            if (err) return next(err);
            if (!response.length) {
                return res.status(200).send({ message: "No service provider in this city" });
            }
            res.status(200).send(response);

        })
    };


}

const usersController = new UsersController();
module.exports = usersController;