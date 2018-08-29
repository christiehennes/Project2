module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,100]
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      image_url: {
          type: DataTypes.STRING,
          allowNull: false
      },
      location: {
          type: DataTypes.STRING,
          allowNull: false 
      }, 
      category: {
          type: DataTypes.STRING,
          allowNull: false
      },
      date_available: {
          type: DataTypes.DATE,
          allowNull: false
      },
      price: {
          type: DataTypes.REAL,
          allowNull: false
      },
      period_requested: {
          type: DataTypes.INTEGER,
          allowNull: false
      }, 
      time_unit: {
          type: DataTypes.STRING,
          allowNull: false
      },
      rented:{
        type: DataTypes.BOOLEAN,
        default: "false"
      }

    });
  
    Product.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Product.belongsTo(models.Owner, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Product;
  };
  