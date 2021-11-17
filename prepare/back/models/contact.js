const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Contact extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
    }, {
      modelName: 'Contact',
      tableName: 'contacts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
      sequelize,
    });
  }
  static associate(db) {
  }
};
