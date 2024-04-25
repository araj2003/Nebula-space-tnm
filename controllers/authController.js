const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsyncError = require("./../utils/catchAsyncError");
const AppError = require("./../utils/appError");
const sendEmail = require("../utils/sendEmail");
const axios = require("axios");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	const token = signToken(user._id);

	res.cookie("jwt", token, {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	});

	// Remove password from output
	user.password = undefined;
	user.active = undefined;
	user.activationToken = undefined;
	user.activationExpires = undefined;
	user.passwordResetExpires = undefined;
	user.passwordResetToken = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};
//yikivel837@cumzle.com
exports.signup = catchAsyncError(async (req, res, next) => {
	try {
		//check if user already exists
		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser) {
			return res
				.status(400)
				.json({ success: false, message: "User already exists" });
		}

		const activationToken = crypto.randomBytes(32).toString("hex");

		// Save the token to the user in the database
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			activationToken: activationToken,
			activationExpires: Date.now() + 60 * 60 * 1000, // 1 hours
			activated: false,
		});

		// Construct the activation link (example)
		const activationLink = `${process.env.FRONTEND_URL}/activate/${activationToken}`;

		const message = `Click on the Link to activate your account :- \n\n ${activationLink} \n\n If you have not requested this email then please ignore it. Link is active for 1 hour.`;
		await sendEmail({
			email: newUser.email,
			subject: `Activate your account`,
			message,
		});

		// Respond with success message
		res.status(200).json({
			success: true,
			message: `Email sent to ${newUser.email} successfully`,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

exports.activateAccount = catchAsyncError(async (req, res, next) => {
	try {
		const query = User.where({
			active: false,
			activationToken: req.params.token,
			activationExpires: { $gt: Date.now() },
		});
		query.useMiddleware = false;
		const user = await query.findOne();

		if (!user) {
			return next(new AppError("Token is invalid or has expired", 400));
		}
		// Set new password
		if (!req.body.password) {
			return next(new AppError("Please provide password", 400));
		}
		user.password = req.body.password;
		user.active = true;
		user.activationToken = undefined;
		user.activationExpires = undefined;
		await user.save({ validateBeforeSave: false });
		// Log the user in, send JWT
		createSendToken(user, 200, req, res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

exports.login = catchAsyncError(async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// 1) Check if email and password exist
		if (!email || !password) {
			return next(new AppError("Please provide email and password!", 400));
		}
		// 2) Check if user exists && password is correct
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Incorrect Email or Password",
			});
		}
		if (user.password === undefined) {
			return res.status(401).json({
				success: false,
				message:
					"This account was created using Google. Please login using Google",
			});
		}

		if (!(await user.correctPassword(password, user.password))) {
			return res.status(401).json({
				success: false,
				message: "Incorrect Email or Password",
			});
		}

		// 3) If everything ok, send token to client
		createSendToken(user, 200, req, res);
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

exports.googleSignup = catchAsyncError(async (req, res, next) => {
	try {
		if (!req.body.googleAccessToken) {
			return res.status(400).json({ message: "Invalid access token!" });
		}
		const { googleAccessToken } = req.body;

		axios
			.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: {
					Authorization: `Bearer ${googleAccessToken}`,
				},
			})
			.then(async (response) => {
				const firstName = response.data.given_name;
				const lastName = response.data.family_name;
				const email = response.data.email;
				const name = firstName + " " + lastName;

				const existingUser = await User.findOne({ email });

				if (existingUser) {
					createSendToken(existingUser, 200, req, res);
					return;
				}

				const user = await User.create({
					name,
					email,
					active: true,
				});
				createSendToken(user, 200, req, res);
			});
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Invalid access token!" });
	}
});

exports.googleLogin = catchAsyncError(async (req, res, next) => {
	try {
		if (!req.body.googleAccessToken) {
			return res.status(400).json({ message: "Invalid access token!" });
		}

		const { googleAccessToken } = req.body;

		axios
			.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: {
					Authorization: `Bearer ${googleAccessToken}`,
				},
			})
			.then(async (response) => {
				const email = response.data.email;
				const existingUser = await User.findOne({ email });

				if (!existingUser)
					return res.status(404).json({ message: "User don't exist!" });
				console.log(existingUser);

				createSendToken(existingUser, 200, req, res);
			});
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Invalid access token!" });
	}
});

exports.logout = (req, res) => {
	res.clearCookie("jwt", { httpOnly: true });
	res.status(200).json({ status: "success" });
};

exports.protect = catchAsyncError(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		return next(
			new AppError("You a are not logged in! Please log in to getccess.", 401)
		);
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	// console.log(currentUser);
	if (!currentUser) {
		return next(
			new AppError(
				"The user belonging to this token does no longer exist.",
				401
			)
		);
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError("User recently changed password! Please log in again.", 401)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	res.locals.user = currentUser;
	// console.log(req.user);
	next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
	if (req.cookies.jwt) {
		try {
			// 1) verify token
			const decoded = await promisify(jwt.verify)(
				req.cookies.jwt,
				process.env.JWT_SECRET
			);

			// 2) Check if user still exists
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next();
			}

			// 3) Check if user changed password after the token was issued
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}

			// THERE IS A LOGGED IN USER
			res.locals.user = currentUser;
			return next();
		} catch (err) {
			return next();
		}
	}
	next();
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='user'
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError("You do not have permission to perform this action", 403)
			);
		}

		next();
	};
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	// 1) Get user based on POSTed email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError("There is no user with email address.", 404));
	}

	// 2) Generate the random reset token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email
	try {
		const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

		const message = `Click on the Link to change your Password :- \n\n ${resetURL} \n\n If you have not requested this email then please ignore it.`;

		// await new sendEmail(user, resetURL).sendPasswordReset();
		await sendEmail({
			email: user.email,
			subject: `Password Recovery`,
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
			// resetToken,
		});
	} catch (err) {
		console.log(err);
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return next(
			new AppError("There was an error sending the email. Try again later!"),
			500
		);
	}
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
	// 1) Get user based on the token
	const hashedToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError("Token is invalid or has expired", 400));
	}

	user.password = req.body.password;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user
	// 4) Log the user in, send JWT
	createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
	// 1) Get user from collection
	const user = await User.findById(req.user.id).select("+password");

	// 2) Check if POSTed current password is correct
	if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
		return next(new AppError("Your current password is wrong.", 401));
	}

	// 3) If so, update password
	user.password = req.body.password;
	await user.save();
	// User.findByIdAndUpdate will NOT work as intended!

	// 4) Log user in, send JWT
	createSendToken(user, 200, req, res);
});
