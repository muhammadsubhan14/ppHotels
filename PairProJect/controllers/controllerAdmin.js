const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const rupiah = require("../helpers/helper");

class ControllerAdmin {
  static async registAdmin(req, res) {
    try {
      res.render("registFormAdmin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async registAdminPost(req, res) {
    try {
      let user = await User.create({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.Email
      });
      await Profile.create({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        UserProfileId: user.dataValues.id,
      });
      res.redirect("/login");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async loginAdmin(req, res) {
    try {
      res.render("loginFormAdmin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async loginAdminPost(req, res) {
    try {
      const { username, password } = req.body;
      let data = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!data) {
        res.redirect("/login?/err=username invalid");
      }
      let user = bcryptjs.compareSync(password, data.password);
      if (user) {
        req.session.role = data.role;
        req.session.userId = dataUser.id;

        res.redirect("/admin");
      } else {
        res.redirect("/login?error=username invalid");
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  static async adminPage(req, res) {
    try {
      let result = await Room.findAll({
        order: [
            ['id', 'ASC'],
        ]
      });
      res.render("adminPage", { result });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomAdd(req, res) {
    // room id
    try {
        const id = req.params.StatusId;
      let result = await Room.findByPk(id);
        res.render("addRoom", {result})
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomAddPost(req, res) {
    try {
        await Room.create({
            roomNumber: req.body.roomNumber,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            roomType: req.body.roomType,
            StatusId: req.body.StatusId
        })
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomIdEdit(req, res) {
    // room i edit
    try {
      const { id } = req.params;
      let result = await Room.findOne({
        where: {
          id
        },
      });
      res.render("editRoom", { result });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomIdEditPost(req, res) {
    // room i edit post
    try {
      const { id } = req.params;
        await Room.update({
            roomNumber: req.body.roomNumber,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            roomType: req.body.roomType,
        },{where: {id}})
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async delRoom(req, res) {
    //delete
    try {
      const { id } = req.params;
      const data = await Room.destroy({ where: { id } });
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async logoutAdmin(req, res){
    try {
        req.session.destroy((err) => {
            if (err){
                console.log(err)
            } else {
                res.redirect("/")
            }
        })
    } catch (error) {
        
    }
}
}

module.exports = ControllerAdmin;
