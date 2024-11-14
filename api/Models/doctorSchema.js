
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
  drImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.ENUM(
      '09:00-10:00 am',
      '10:00-11:00 am',
      '11:00-12:00 noon',
      '12:00-01:00 pm',
      '01:00-02:00 pm',
      '03:00-04:00 pm',
      '04:00-05:00 pm',
      '--:--'
    ),
    defaultValue: '--:--',
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
});

export default Doctor;
