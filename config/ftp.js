const Client = require("ftp");

const ftpConfig = {
  host: process.env.FTP_HOST,
  port: 21,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
};

const conexionFTP = () => {
  return new Promise((resolve, reject) => {
    const client = new Client();

    client.on("ready", () => {
      console.log("FTP Conexión Correcta!");
      resolve(client);
    });

    client.on("error", (err) => {
      console.log("FTP Error de Conexión", err);
      reject(err);
    });

    client.connect(ftpConfig);
  });
};

const uploadToFTP = async (imageBuffer, destinationPath) => {
  const client = await conexionFTP();

  return new Promise((resolve, reject) => {
    client.put(imageBuffer, destinationPath, (err) => {
      client.destroy();

      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(
          `Imagen guardada exitosamente en el servidor FTP: ${destinationPath}`
        );
        resolve();
      }
    });
  });
};

module.exports = { conexionFTP,uploadToFTP };
