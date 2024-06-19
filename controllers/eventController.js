
import Event from '../models/eventModel.js' ;
import User  from '../models/userModel.js';
import { getDataUri } from '../utils/features.js';
import cloudinary from "cloudinary";

// import path from 'path' ;
// import fs from 'fs' ;

export const createEvent = async (req, res) => {
  
  
  try {
      let { topic, description, startDate, startTime, endDate, endTime, wallpaper, webinarLink, takerEmail } = req.body;
    
      console.log(req.file);
      console.log(req.body);
      
      if(req.file)
        {
          const file = getDataUri(req.file);
          const cloudinaryResult = await cloudinary.v2.uploader.upload(file.content);
          wallpaper = cloudinaryResult.secure_url;
          // req.user.profile_pic.public_id = cloudinaryResult.public_id;
          
          console.log(cloudinaryResult);
        }
        else throw new Error("File must be image");
        
        console.log(req.body);



        const taker = await User.findOne({ email: takerEmail });
        if (!taker) {
            return res.status(400).json({ message: 'Taker not found' });
        }

        const event = new Event({
            topic,
            description,
            startDate: new Date(startDate),
            startTime,
            endDate: new Date(endDate),
            endTime,
            wallpaper,
            webinarLink,
            taker: taker._id
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
      console.log(error)
        res.status(400).json({ message: error.message });
    }
};

// Get Events
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('taker', 'name aboutMe profile_pic');
        // console.log(events) ;
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete wallpaper file
    // if (event.wallpaper) {
    //   fs.unlinkSync(path.resolve(event.wallpaper));
    // }e

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

