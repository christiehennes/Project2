const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    let Owner = sequelize.define("Owner", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        },
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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    });

    Owner.associate = function(models) {
        Owner.hasMany(models.Product, {
          onDelete: "cascade"
        });
        Owner.hasMany(models.AuthToken);
    };

     // This is a class method, it is not called on an individual
  // user object, but rather the class as a whole.
  // e.g. User.authenticate('user1', 'password1234')
  Owner.authenticate = async function(username, password) {

    const user = await Owner.findOne({ where: { username }});

    console.log("USER: "+ JSON.stringify(user));

    // bcrypt is a one-way hashing algorithm that allows us to 
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
  }

    // in order to define an instance method, we have to access
    // the User model prototype. This can be found in the
    // sequelize documentation
    Owner.prototype.authorize = async function () {
        console.log("inside authorize");

        
        const { AuthToken } = sequelize.models;
        const user = this;

        // create a new auth token associated to 'this' user
        // by calling the AuthToken class method we created earlier
        // and passing it the user id
        const authToken = await AuthToken.generate(this.id);

        // addAuthToken is a generated method provided by
        // sequelize which is made for any 'hasMany' relationships
        await user.addAuthToken(authToken);

        return { user, authToken }
    };


    Owner.prototype.logout = async function (token) {

        // destroy the auth token record that matches the passed token
        sequelize.models.AuthToken.destroy({ where: { token } });
    };

    return Owner;
};
