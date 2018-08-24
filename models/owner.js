module.exports = function(sequelize, DataTypes) {
    let Owner = sequelize.define("Owner", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    // Owner.associate = function(models) {
    //     Owner.hasMany(models.Product, {
    //       onDelete: "cascade"
    //     });
    // };

    return Owner;
};
