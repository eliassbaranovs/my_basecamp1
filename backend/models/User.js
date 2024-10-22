const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"], // Basic email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Ensure a minimum password length for security
  },
  role: {
    type: String,
    default: "user", // Default role is 'user'
    enum: ["user", "admin"], // The role can only be 'user' or 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or it's new)
    if (!this.isModified("password")) {
      return next();
    }

    // Hash the password with a salt of 10 rounds
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Method to check if entered password matches the stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
