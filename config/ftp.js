const Client = require("ftp");

const ftpConfig = {
  host: process.env.FTP_HOST,
  port: 21,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
};

let ftpClient = null;

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

// const conexionFTP = () => {
//     return new Promise((resolve, reject) => {
//       if (ftpClient === null || !ftpClient?.connected){
//         console.log('conexion vacia, se esta creando');
//         ftpClient = new Client();
    
//         ftpClient.on("ready", () => {
//           console.log("FTP Conexión Correcta!");
//           resolve(ftpClient);
//         });
    
//         ftpClient.on("error", (err) => {
//           console.log("FTP Error de Conexión", err);
//           reject(err);
//         });
    
//         ftpClient.connect(ftpConfig);
//       }else{
//         console.log('conexion ya creada');

//         resolve(ftpClient)
//       }
//     });
// };

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
