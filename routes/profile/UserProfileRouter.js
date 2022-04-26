import express from "express"
import User from "../../models/User.js";
import authVerify from "../../middleware/AuthVerify.js";

const userProfileRouter = express.Router();

userProfileRouter.get("/get-user-profile", authVerify, async (req, res) => {
    try {
        const user = await User.findOne({user_id: req.userId});

        res.status(200).json(user)

    } catch (error) {
        res.status(500).send(error);
    }

})
userProfileRouter.post("/update-user-profile", authVerify, async (req, res) => {
    try {
        const user = await User.findOne({user_id: req.userId});

        user.First_name = req.body.FirstName
        user.Last_name = req.body.LastName
        user.Gender = req.body.gender
        user.Date_of_birth = req.body.Date_of_birth
        user.username = req.body.username
        await user.save()

        res.status(200).send("User profile updated")

    } catch (error){
        res.status(500).send(error);
    }
})

export {userProfileRouter}