import userModel from "../models/userModel.js";
// register controller
export const registerController = async (req, res, next) => {
  try {
    const { role, name, email, password } = req.body;
    console.log(req.body);
    if (!role || !name || !email || !password) {
      throw new Error("All fields are required");
    }

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists");
    }

    const user = await userModel.create({ role, name, email, password });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registerController:", error);
    next(error);
  }
};

// login controller

export const loginController = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      throw new Error("all field required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("invalid email password or role");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("invalid email password or role");
    }
    if (user.role != role) {
      throw new Error("invalid email password or role");
    }
    const token = user.createJWT();

    return res.status(200).cookie("token", token, {
      expires:new Date(Date.now()+1*24*60*60)
    }).send({
      success: true,
      messege: "login sucessfully",
      token,
      user,
    });
  } catch (error) {
    console.log("error in loginController");
    next(error);
  }
};
