const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');

module.exports =  (sequelize ,DataTypes) =>{

    const Users = sequelize.define('Users', {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
          validate: {
            isEmail: {
              args: true,
              msg: 'Invalid email address',
            },
        }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
    } ,
    {
    hooks: {
            beforeCreate: async (user) => {
            // Hash the password before saving it to the database
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        
            // Set the createdAt field to the current date and time
            user.createdAt = new Date();
            }, 
        }
    })

    return Users
}