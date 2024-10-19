const dbconfig = require('../config/dbconfig.js')
const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize(
  dbconfig.db,
  dbconfig.user,
  dbconfig.password ,{
    host : dbconfig.host,
    dialect : dbconfig.dialect , 
    operatorsAliases:false,
  }
)

sequelize.authenticate()
.then(()=>{
    console.log('db is connected')
})
.catch((err)=> {
    console.log('error', err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.js')(sequelize,DataTypes)
db.Posts = require('./Post.js')(sequelize,DataTypes)

db.users.hasMany(db.Posts)
db.Posts.belongsTo(db.users)

db.sequelize.sync({force:false})
.then(()=> {
    console.log('sync sucssful');
})

module.exports = db