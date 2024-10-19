const Users = require('./user'); 

module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define('Posts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        review:{
            type:DataTypes.STRING,
        },
        author:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        image: {
            type: DataTypes.BLOB('long'),
            allowNull:false,
        },
        username: {
            type:DataTypes.STRING
        },

        filename: DataTypes.STRING, 
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        hooks: {
            beforeCreate: async (post) => {
                post.createdAt = new Date();
            },
        }
    });


    return Posts;
};
