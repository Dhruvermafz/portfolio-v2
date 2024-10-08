const User = require("../models/user");
const jwt = require("../middlewares/jwt");

const usersService = {
  create: async (body) => {
    const user = await User.findOne({ where: { email: body.email } });
    if (user)
      return {
        error: { code: 409, message: { message: "User already registered" } },
      };
    await User.create(body);
    const { password, image, ...userPublicInfo } = body;
    return jwt.createToken(userPublicInfo);
  },
  findAll: async () => {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return users;
  },
  findByPk: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user)
      return {
        error: { code: 404, message: { message: "User does not exist" } },
      };
    return user;
  },
  destroy: async (email) => {
    const destroyUser = await User.destroy({
      where: { email },
    });
    if (!destroyUser)
      return {
        error: { code: 404, message: { message: "User does not exist" } },
      };
    return destroyUser;
  },
};

module.exports = usersService;
