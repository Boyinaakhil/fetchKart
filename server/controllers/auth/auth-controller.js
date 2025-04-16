const bcrypt = require('bcryptjs');
const User = require('../../models/User'); 
const jwt = require('jsonwebtoken');


// Register User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists!",
      });
    }
    // if (existingUser) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists!",
    //   });
    // }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,  // confirmPassword is NOT stored in DB
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const logoutUser = (req,res)=>{
  res.clearCookie('token').json({
    success: true,
    message: "Logged out successfully",
  })
  
}

//auth-middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Please login first",
    });
  }
  try{
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  }
  catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized! Please login first",
    });
  }
}



module.exports = { registerUser, loginUser , logoutUser, authMiddleware };
