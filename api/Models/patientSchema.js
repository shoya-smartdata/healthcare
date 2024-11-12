
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default to false when registering
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true // Token will be set when generating verification email
  }
  // tokenExpiry: {
  //   type: DataTypes.STRING,
  //   allowNull: true 
  // }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
});

export default Patient;
