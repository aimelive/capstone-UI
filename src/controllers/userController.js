import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const createUser = async(req, res) => {
    try {

        const email = req.body.email;
        const emailExist = await User.find({
            email: email.toLowerCase()
        })
        if (emailExist.length) {
            res.status(400).json({
                Message: `E-mail <${email}> exists!!`
            })
        } else {


            const salt = await bcrypt.genSalt(10)
            const pwd = await bcrypt.hash(req.body.password, salt)
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                role: req.body.role,
                password: pwd,
                phone: req.body.phone,
            })

            res.status(201).json({
                Congratulation: "User Account to @Aimelive has been successfully created",
                Account: { newUser }

            })

        }
    } catch (error) {
        res.status(400).json({
            Oops: "An error occured",
            Check_error_please: { error }
        })
    }

}


export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find()
        const normal_users = await User.find({ role: "user" })
        const admins = await User.find({ role: "admin" })
        res.status(200).json({
            Message: `Hey, ${normal_users.length} Normal users, and ${admins.length} Admins retrieved successfully!!`,
            Results: users.length,
            Admins: { admins },
            Users: { normal_users }

        })
    } catch (error) {
        res.status(500).json({
            Oops: "An error occured",
            Error: { error }
        })
    }

}


export const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user !== null) {
            res.status(200).json({
                Message: `User retrieved sucessfully`,
                Data: { user }

            })
        } else {
            res.status(404).json({
                Error: `We can't find user with an ID ${req.params.id}`
            })
        }

    } catch (error) {

    }

}


export const updateUser = async(req, res) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }, {
            new: true,
            runValidators: true
        })
        if (user !== null) {
            res.status(200).json({
                Success: `User ${user.name} Updated successfully!!`,
                Data: { user }

            })
        } else {
            res.status(404).json({
                Error: "User no longer exists"
            })
        }

    } catch (error) {
        res.status(404).json({
            Message: "An error occured",
            Error: error.stack
        })
    }

}


//Update password
export const updatePassword = async(req, res) => {

    try {
        const userId = req.user._id

        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(req.body.NewPassword, salt)

        await User.findByIdAndUpdate(userId, { password: pass }, { new: true, runValidators: true })

        res.status(200).json({
            Message: "Password Updated",
            Password: pass,
            ID: userId
        })

    } catch (error) {
        res.status(400).json({
            Message: "An error occured!!",
            Error: error.stack
        })

    }

}



export const deleteUser = async(req, res) => {
    try {
        const delUser = await User.findByIdAndDelete(req.params.id)
        if (delUser !== null) {
            res.status(202).json({
                Message: `${delUser.role} ${delUser.name} deleted successfully!!`
            })
        } else {
            res.status(404).json({
                Error: "User no longer exists!!!",
                Info: "We can't delete non-existing user from our database",
                Tips: `This id ${req.params.id} can't be found in our database, Please make sure that you've entered correct user id`
            })
        }


    } catch (error) {
        res.status(404).json({
            Error: "Oops! Something went wrong!!!",
            Data: error.stack
        })
    }

}

export const login = async(req, res) => {
    try {
        const body = req.body;

        const user = await User.findOne({ email: body.email });
        if (user) {

            const validPassword = await bcrypt.compare(body.password, user.password);

            if (validPassword) {
                const token = jwt.sign({ email: user.email, fullName: user.name, _id: user._id }, 'AIMELIVE APP')
                res.status(200).json({
                    Message: `Welcome ${user.name} , You're Successfully logged in!`,
                    Token: token
                });
            } else {
                res.status(400).json({ Error: "Invalid Password!!" });
            }
        } else {
            res.status(401).json({ Error: "User does not exist!!" });
        }
    } catch (error) {
        res.status(404).json({
            Message: "An internal error occured!!",
            Error: error.stack
        })

    }
}