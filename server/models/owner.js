const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
// let Owner = sequelize.define('Owner', {
//     username: {
//         type: DataTypes.STRING,
//         unique: {
//             args: true,
//             message: 'Username must be unique.',
//             fields: [sequelize.fn('lower', sequelize.col('username'))]
//         },
//         validate: {
//             min: {
//                 args: 3,
//                 msg: 'Username must start with a letter, have no spaces, and be at least 3 characters.'
//             },
//             max: {
//                 args: 20,
//                 msg: 'Username must start with a letter, have no spaces, and be at less than 20 characters.'
//             },
//             is: {
//                 args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
//                 msg: 'Username must start with a letter, have no spaces, and be 3 - 20 characters.'
//             }
//         },
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: {
//             args: true,
//             msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
//             fields: [sequelize.fn('lower', sequelize.col('email'))]
//         },
//         validate: {
//             isEmail: {
//                 args: true,
//                 msg: 'The email you entered is invalid or is already in our system.'
//             },
//             max: {
//                 args: 254,
//                 msg: 'The email you entered is invalid or longer than 254 characters.'
//             }
//         }
//     },
//     first_name: {
//         type: DataTypes.STRING,
//         validate: {
//             isAlpha: true,
//             max: {
//                 args: 254,
//                 msg: 'Your full name can only contain letters.'
//             }
//         }
//     },
//     last_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isAlpha: true,
//             max: {
//                 args: 254,
//                 msg: 'Your last name can only contain letters.'
//             }
//         }
//     },
//     phone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             isNumeric: true,
//             len: {
//                 args: 10,
//                 msg: 'Enter 10 digit phone number with no extra characters'
//             }
//         }
//     }
// }, {
//     indexes: [{
//         unique: true,
//         fields: ['username', 'email']
//     }]
// });

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



