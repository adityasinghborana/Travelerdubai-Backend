const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userModel = {
  async getAllUsers() {
    return await prisma.user.findMany({
      include: {
        orders: true,
      },
    });
  },

  async createUser({
    email,
    username,
    uid,
    isAdmin,
    isUser,
    isAgent,
    address,
    age,
    dob,
    profileImage,
  }) {
    const existingUser = await prisma.user.findFirst({
      where: {
        uid,
      },
    });

    if (existingUser) {
      throw new Error("User with this UID already exists");
    }

    return await prisma.user.create({
      data: {
        email,
        username,
        uid,
        isAdmin,
        isUser,
        isAgent,
        address,
        age,
        dob,
        profileImage,
      },
    });
  },

  async deleteUser(email) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: {
        email,
      },
    });

    return { message: "User deleted successfully" };
  },

  async checkUser(uid) {
    return await prisma.user.findMany({
      where: {
        uid,
      },
    });
  },

  async updateUser({ email, username }) {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await prisma.user.update({
      where: {
        email,
      },
      data: {
        username,
        email,
      },
    });
  },
};

module.exports = userModel;
