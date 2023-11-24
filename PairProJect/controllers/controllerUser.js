const { User, Profile,Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const rupiah = require("../helpers/helper");

class ControllerUser {
  static async registUser(req, res) {
    // add user
    try {
      res.render("registFormUser");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async registUserProcess(req, res) {
    // post add
    try {
    //   console.log(req.body, "<<<<");
      let user = await User.create({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.Email
      });

      let profile = await Profile.create({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        UserProfileId: user.dataValues.id,
      });
      res.redirect('/login')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async loginUser(req, res) {
    // login user
    try {
      res.render("loginFormUser");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async loginUserProcess(req, res) {
    // post login user
    try {
        // console.log(req.body, ">>>");
      const { username, password } = req.body;
      let dataUser = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!dataUser) {
        res.redirect("/login?error=username invalid");
      }
      let user = bcryptjs.compareSync(password, dataUser.password);
      if (user) {
        req.session.role = dataUser.role;
        req.session.userId = dataUser.id;
        // console.log(req.session.userId , "tess>");

        // console.log(req.session.userId , "tess>");
        res.redirect("/users");
      } else {
        res.redirect("/login?error=username invalid");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showAllRooms(req, res) {
    // menampilkan semua rooms
    try {
      // console.log("masuk");
      const result = await Room.findAll({
        where: {
          StatusId: 2,
        },
        order: [["id", "ASC"]],
      });
    //   console.log(result);
      res.render("userPage", { rupiah, result });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async bookRoom(req, res) {
    //booking atau beli
    try {
      const { id } = req.params;
      console.log(id, "id");

      const room = await Room.findOne({
        where: {
          id: id,
        },
      });
    //   console.log(room);
      //   console.log(id, "<<<");
      if (!room) {
        return res.status(404).send("Room not found");
      }

      if (room.StatusId > 1) {
        await room.decrement("StatusId", { by: 1 });
      }

      res.redirect("/users");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderProfile(req, res){
    try {
        // console.log(req.session.userId, "kk");
        let { id } = req.params
        let dataProfile = await Profile.findOne({
            where:{
                id: req.session.userId
            }
        })
        // console.log(dataProfile);
        res.render('profile', {dataProfile})

    } catch (error) {
        console.log(error);
        res.send(error)
    }
  }
}

module.exports = ControllerUser;
