const express = require('express');
const bcrypt = require('bcrypt');

const { Contact } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /contact
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const contact = await Contact.create({
      content: req.body.content,
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    const fullContact = await Contact.findOne({
      where: { id: contact.id },
    })
    res.status(201).json(fullContact);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.delete('/', async (req, res, next) => { // DELETE /contact/10
  try {
    // console.log(req.query);
    const contact = await Contact.findOne({ where: { id: parseInt(req.query.id) } });
    if (!contact) {
      return res.status(403).send({ id: parseInt(req.query.id, 10), message: "The contact doesn't exist." });
    }
    const result = await bcrypt.compare(req.query.password, contact.password);
    if (result) {
      await Contact.destroy({
        where: {
          id: req.query.id,
        },
      });
      res.status(200).json({ ContactId: parseInt(req.query.id, 10) });
    } else {
      return res.status(403).send({ id: parseInt(req.query.id, 10), message: "Incorrect password." });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
