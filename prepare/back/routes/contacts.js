const express = require('express');
const { Op } = require('sequelize');

const { Contact } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /contacts
  try {
    const where = {};
    if (parseInt(req.query.page, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.page, 10) }
    }
    const contacts = await Contact.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: ['content', 'nickname', 'email', 'id'],
    });
    // console.log(contacts);
    if (contacts) {
      const newObj = JSON.parse(JSON.stringify(contacts));
      newObj.map((unit) => {
        unit.key = unit.id;
      });
      // console.log(newObj);
      res.status(200).json(newObj);
    } else {
      res.status(403).send("The contacts don't exist.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
