import  Sequelize  from "sequelize";
import 'dotenv/config';
// Setup MySQL connection
const data = process.env.DB_HOST;
console.log(data);


const sequelize = new Sequelize(process.env.DB_NAME, 'root', process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;