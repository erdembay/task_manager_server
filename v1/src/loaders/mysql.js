const { Sequelize } = require("sequelize");
// MySQL bağlantısı
const mysqlDb = new Sequelize(
  `${process.env.MYSQL_DB_NAME}`,
  `${process.env.MYSQL_DB_USER}`,
  `${process.env.MYSQL_DB_PASS}`,
  {
    host: `${process.env.MYSQL_DB_HOST}`, // Veritabanı sunucusunun adresi
    dialect: "mysql", // Mysql kullanıyoruz
    logging: false, // SQL sorgularını görmek için true yapabilirsiniz
    retry: {
      max: 5, // Yeniden deneme sayısı
      match: [
        /ETIMEDOUT/,
        /ECONNREFUSED/,
        /ENOTFOUND/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
      ],
    },
    pool: {
      max: 5, // Maksimum aktif bağlantı
      min: 0, // Minimum aktif bağlantı
      acquire: 30000, // Bağlantı elde etme süresi (ms)
      idle: 10000, // Boşta bekleme süresi (ms)
    },
  }
);
const connectMySQL = async () => {
  try {
    await mysqlDb.authenticate();
    console.log("MySQL bağlantısı başarılı!");
  } catch (error) {
    console.error("Bağlantı hatası:", error?.message);
    console.log("Yeniden bağlanmayı deniyor...");
    setTimeout(connectMySQL, 5000); // 5 saniye sonra tekrar dene
  }
};
module.exports = {
  connectMySQL,
  mysqlDb,
};
