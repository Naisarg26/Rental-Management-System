const jwt = require("jsonwebtoken");
const { createError } = require ("../utils/error");

exports.verifyToken1 = (req, res, next) => {
  let accessToken = req.cookies.jwt;

	// if there is no token in the cookies, request is unauthorized
	if (!accessToken) {
		return res.status(403).json({
			error: "Unauthorized",
		});
	}

	let payload;
	try {
		// verify the token jwt.verify
		// throws an erro if token has expired or has an invalid signature
		payload = jwt.verify(accessToken, process.env.JWT_SECRET);
		req._id = payload._id;

		next();
	} catch (e) {
		// return req unauthorized error
		return res.status(403).json({
			error: "Unauthorized",
		});
	}
};

exports.verifyUser = (req, res, next) => {
  verifyToken1(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken1(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
