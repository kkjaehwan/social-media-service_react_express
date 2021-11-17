const express = require('express');

const { Contact } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /contact
  try {
    const contact = await Contact.create({
      content: req.body.content,
      email: req.body.email,
      nickname: req.body.nickname,
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


router.delete('/:contactId', async (req, res, next) => { // DELETE /contact/10
  try {
    await Contact.destroy({
      where: {
        id: req.params.contactId,
      },
    });
    res.status(200).json({ ContactId: parseInt(req.params.contactId, 10)});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
