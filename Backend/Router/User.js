const express = require('express');
const {User} = require('../Model/User')
const {AppointmentModel} = require("../Model/Appointment")
const UserRouter = express.Router();

// Get User By UserID //
UserRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userInfo = await User.findByPk(userId);
    if (!userInfo) {
      return res.status(404).send("User not available");
    } else {
      return res.send({ message: "User fetched successfully", userInfo });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

// Get all the Appointments accocated with User //

User.hasMany(AppointmentModel, { foreignKey: "UserID" });
AppointmentModel.belongsTo(User, { foreignKey: "UserID" });

UserRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userInfo = await User.findByPk(userId, {
      include: [
        {
          model: AppointmentModel,
        },
      ],
    });
    if (!userInfo) {
      return res.status(404).send("User not available");
    } else {
      return res.send({ message: "User fetched successfully", userInfo });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

// if you want to modify User you have to use this route ! note that this is 
// not for frotend use

UserRouter.delete("/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send("User not available");
      }
  
      // Delete the user
      await user.destroy();
  
      return res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  });
  

module.exports = {
  UserRouter
};


