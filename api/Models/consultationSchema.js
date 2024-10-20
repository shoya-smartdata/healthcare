import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Patient from './patientSchema.js';
import Doctor from './doctorSchema.js';

const Consultation = sequelize.define('Consultation', {
  status: {
    type: DataTypes.ENUM('Accepted', 'Confirmed', 'Completed','Pending'),
    defaultValue: 'Pending',
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  skinImage: {
    type: DataTypes.STRING, 
    allowNull: false,
  }
});

Consultation.belongsTo(Patient);
Consultation.belongsTo(Doctor);

export default Consultation;