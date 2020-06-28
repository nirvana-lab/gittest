const Sequelize = require('sequelize');
const db = require('../db');

const UserRepo = db.define('user_repo', {
  user: Sequelize.INTEGER(),
  repo: Sequelize.INTEGER(),
  host: Sequelize.STRING(100),
}, {
  timestamps: false,
});

module.exports = UserRepo;
