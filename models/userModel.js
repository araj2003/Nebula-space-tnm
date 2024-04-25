const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please Enter your name"],
		maxLength: [30, "Name cannot exceed 30 characters"],
		minLength: [4, "Name should more than 30 character"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		validate: [validator.isEmail, "Please Enter a valid Email"],
	},
	password: {
		type: String,
		minLength: [8, "password should be greater than 8 characters"],
		select: false,
	},
	role: {
		type: String,
		default: "user",
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: false,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	address: {
		type: mongoose.Schema.ObjectId,
		ref: "Address",
		default: null,
	},
	animals: [
		{
			animalName: {
				type: String,
			},
			quantity: {
				type: Number,
			},
		},
	],
	cart: {
		type: [mongoose.Schema.ObjectId],
		ref: "CartItem",
		default: null,
	},
	orders: {
		type: [mongoose.Schema.ObjectId],
		ref: "Order",
		default: null,
	},
	activationToken: String,
	activationExpires: Date,
});

UserSchema.pre("save", async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified("password")) return next();

	// Hash the password with cost of 10
	this.password = await bcrypt.hash(this.password, 10);

	next();
});

UserSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

UserSchema.pre(/^find/, function (next) {
	// this points to the current query
	if (this.useMiddleware === false) return next();
	this.find({ active: { $ne: false } });
	next();
});

// JWT TOKEN
// UserSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE,
//   });
// };

// Compare password
UserSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};

//Generating Password Reset Token
UserSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	// console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
