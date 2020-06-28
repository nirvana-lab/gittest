const Sequelize = require('sequelize');
const db = require('../db');

const Git = db.define('git', {
  host: Sequelize.STRING(100),
  type: Sequelize.STRING(20),
  client_id: Sequelize.STRING(100),
  client_secret: Sequelize.STRING(100),
  callback: Sequelize.STRING(100),
  state: Sequelize.STRING(100),
}, {
  timestamps: false,
});

module.exports = Git;
