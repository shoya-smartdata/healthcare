
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Doctor = sequelize.define('Doctor', {
  
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialization: {
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
  availability: {
    type: DataTypes.STRING,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false // Default to false when registering
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true // Token will be set when generating verification email
  }
});

export default Doctor;