import Messages from "../models/messageModel.js";

export const createMessage = async(req, res) => {
    try {
        const newMessage = await Messages.create(req.body)
        res.status(201).json({
            status: "Success",
            data: { newMessage }

        })
    } catch (error) {
        res.status(400).json({
            message: "An error occured",
            data: { error }
        })
    }

}





export const getAllMessages = async(req, res) => {
    try {
        const messages = await Messages.find()
        res.status(200).json({
            status: "Success",
            result: messages.length,
            data: { messages }

        })
    } catch (error) {
        res.status(500).json({
            message: "An error occured",
            data: { error }
        })
    }

}




export const getMessage = async(req, res) => {
    try {
        const message = await Messages.findById(req.params.id)
        if (message != null) {
            res.status(200).json({
                status: "Success",
                data: { message }

            })
        } else {
            res.status(200).json({
                Message: "Sorry, We can't find the message!!"

            })
        }

    } catch (error) {
        res.status(404).json({
            message: "An error occured",
            data: error.stack
        })
    }

}


export const updateMessage = async(req, res) => {
    try {
        const message = await Messages.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "Success",
            data: { message }

        })
    } catch (error) {
        res.status(404).json({
            message: "An error occured",
            data: error.stack
        })
    }

}


export const deleteMessage = async(req, res) => {
    try {

        const delM = await Messages.findByIdAndDelete(req.params.id)
        if (delM !== null) {
            res.status(202).json({
                Message: "Deleted successfully",


            })
        } else {
            res.status(404).json({
                Message: `Sorry, We can't find the message you are trying to delete`
            })
        }


    } catch (error) {
        res.status(404).json({
            Message: "An error occured",
            Error: error.stack
        })
    }

}