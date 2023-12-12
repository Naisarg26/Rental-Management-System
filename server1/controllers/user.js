const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
	// check if user already exists
	const usernameExists = await User.findOne({
		username: req.body.username,
	});
	const emailExists = await User.findOne({
		email: req.body.email,
	});

	if (usernameExists) {
		return res.status(403).json({
			error: "Username is taken",
		});
	}
	if (emailExists) {
		return res.status(403).json({
			error: "Email is taken",
		});
	}

	// if new user, create a new user
	const user = new User(req.body);
	await user.save();

	res.status(201).json({
		message: "Signup Successful! Please Login to proceed",
	});
};

exports.login = async (req, res) => {
	// find the user based on email
	const { email, password } = req.body;

	await User.findOne({ email }).exec((err, user) => {
		// if err or no user
		if (err || !user) {
			return res.status(401).json({
				error: "Invalid Credentials",
			});
		}

		// if user is found, we use the authenticate method from the model
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Invalid email or password",
			});
		}

		// generate a token with user id and jwt secret
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "24h",
		});

		// persist the token as 'jwt' in cookie with an expiry date
		res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });

		// return the response with user
		const { username } = user;
		return res.json({
			message: "Login Successful!",
			username,
		});
	});
};

exports.logout = (req, res) => {
	// clear the cookie
	res.clearCookie("jwt");

	return res.json({
		message: "Logout Successful!",
	});
};

exports.getLoggedInUser = (req, res) => {
	const { username } = req.user;

	return res.status(200).json({
		message: "User is still logged in",
		username,
	});
};
// Rest of your code

exports.updateUser = async (req,res,next)=>{
	try {
	  const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ new: true }
	  );
	  res.status(200).json(updatedUser);
	} catch (err) {
	  next(err);
	}
  }
  exports.deleteUser = async (req,res,next)=>{
	try {
	  await User.findByIdAndDelete(req.params.id);
	  res.status(200).json("User has been deleted.");
	} catch (err) {
	  next(err);
	}
  }
  exports.getUser = async (req,res,next)=>{
	try {
	  const user = await User.findById(req.params.id);
	  res.status(200).json(user);
	} catch (err) {
	  next(err);
	}
  }
  exports.getUsers = async (req,res,next)=>{
	try {
	  const users = await User.find();
	  res.status(200).json(users);
	} catch (err) {
	  next(err);
	}
  }
  
  

  
  exports.resetPassword = async (req, res) => {
	try {
	  const { email, newPassword } = req.body;
  
	  // Find the user by the reset token and email
	  const user = await User.findOne({
		email,
		
	  });
  
	  if (!user) {
		return res.status(404).json({ error: "User not Found" });
	  }
  
	  // Update the user's password and clear the reset token fields
	  user.password = newPassword;
	  
	  await user.save();
  
	  res.json({ message: "Password reset successfully" });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };
  
  // Rest of your existing code...
  