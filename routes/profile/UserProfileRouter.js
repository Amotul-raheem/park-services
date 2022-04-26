import express from "express"
import User from "../../models/User.js";
import authVerify from "../../middleware/AuthVerify.js";

const userProfileRouter = express.Router();

userProfileRouter.get("/get-user-profile", authVerify, async (req, res) => {
    try {
        const user = await User.findOne({user_id: req.userId});
        const userDetails = user.user_profile

        res.status(200).json(userDetails)

    } catch (error) {
        res.status(500).send(error);
    }

})
userProfileRouter.post("/update-user-profile", authVerify, async (req, res) => {
    try {
        const user = await User.findOne({user_id: req.userId});

        user.user_profile.first_name = req.body.FirstName
        user.user_profile.last_name = req.body.LastName
        user.user_profile.gender = req.body.Gender
        user.user_profile.date_of_birth = req.body.DateOfBirth
        user.user_profile.username = req.body.username
        await user.save()

        res.status(200).send("User profile updated")

    } catch (error){
        res.status(500).send(error);
    }
})

export {userProfileRouter}