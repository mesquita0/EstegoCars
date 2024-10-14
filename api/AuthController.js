const express = require('express');
const bcrypt = require('bcryptjs');
const { Users } = require('./db.js');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;

  const user = await Users.get(cpf);
  
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(409).json({error: "CPF ou Senha invalida."});
    return;
  }

  req.session.userid = user.id;
  req.session.save(() => res.redirect('/api/cars'));
});

router.post('/register', async (req, res) => {
  const { cpf, name, password } = req.body;

  if (await Users.get(cpf)) {
    res.status(409).json({error: "there is already a user with this cpf"});
    return;
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const id = await Users.add(cpf, name, hash);

  req.session.userid = id;
  req.session.save(() => res.redirect('/api/cars'));
});

module.exports = router;
