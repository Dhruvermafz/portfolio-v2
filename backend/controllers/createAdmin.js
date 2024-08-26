const bcrypt = require("bcrypt");
const User = require("../models/User");

const createadmin = async () => {
  const user = new User({
    username: "admin",
    password: "admin",
    email: "admin@admin.com",
    role: "admin",
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  console.log("Admin created");
};

module.exports = createadmin;
