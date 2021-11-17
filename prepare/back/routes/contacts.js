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
    });
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
