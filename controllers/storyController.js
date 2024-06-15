import storyModel from "../models/storyModel.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";

export const getStoriesController = async (req, res, next) => {
    try {
        const result = await storyModel.find({userID : req.user._id});

        res.status(200).json({
            success: true,
            result
           
        });


    } catch (err) {
        console.log(err);
        next(err);
    }
}




export const createStoryController = async (req, res, next) => {
    try {
        req.body.picture = { url: null, public_id: null };
        console.log(req.body, req.file);
        console.log(req.user);


        const file = getDataUri(req.file);
        const cloudinaryResult = await cloudinary.v2.uploader.upload(file.content);
        req.body.picture.url = cloudinaryResult.secure_url;
        req.body.picture.public_id = cloudinaryResult.public_id;

        console.log('image saved to cloudinary');
        console.log(cloudinaryResult);

        req.body.userID = req.user._id;

        const result = await storyModel.create(req.body);
        console.log("story saved to database", result);


        res.status(200).json({
            success: true,
            message: 'Story created successfully',
            // userId: req.user
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
}

