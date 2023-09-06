const Client = require("ftp");
const { createPool } = require("generic-pool");

const ftpConfig = {
  host: process.env.FTP_HOST,
  port: 21,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
};

const factory = {
  create: () => {
    const client = new Client();

    return new Promise((resolve, reject) => {
      client.on("ready", () => {
        console.log("FTP Conexión lista!");
        resolve(client);
      });

      client.on("error", (err) => {
        console.log("FTP Error de Conexión Aqui", err);
        reject(err);
      });

      client.connect(ftpConfig);
    });
  },
  destroy: (client) => {
    client.end();
  },
};

const ftpPool = createPool(factory, {
  max: 8, // Número máximo de conexiones en el pool
  min: 5,  // Número mínimo de conexiones en el pool
  // idleTimeoutMillis: 3, // Tiempo de espera antes de cerrar la conexión inactiva
});


// const conexionFTP = async () => {
//   console.log('3.1.1 EN CONEXIONFTP')

//   try {
//     console.log('3.1.1.2 RETORNO UNA CONEXION')

//     return await ftpPool.acquire();
//   } catch (error) {
//     console.error('Error al adquirir una conexión FTP', error);
//     throw error;
//   }
// };

function uploadFile(localPath, remotePath) {
  return ftpPool.acquire().then((client) => {
    return new Promise((resolve, reject) => {
      client.put(localPath, remotePath, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log('File uploaded successfully');
          resolve();
        }
        ftpPool.release(client);
      });
    });
  }).catch((err) => {
    console.error(err);
    throw err;
  });
}

// const uploadToFTP = async (imageBuffer, destinationPath) => {
//   console.log('1. Solicitando una conexión FTP');

//   try {
//     const client = await ftpPool.acquire();
//     console.log('2. Conexión adquirida del pool:', client);

//     return new Promise((resolve, reject) => {
//       console.log('3. Iniciando la promesa de carga');

//       client.put(imageBuffer, destinationPath, (err) => {
//         console.log('4. Completando operación de carga');

//         if (err) {
//           console.error('Error durante la carga:', err);
//           reject(err);
//         } else {
//           console.log('Carga exitosa');
//           resolve();
//         }

//         // Importante: Liberar la conexión después de usarla
//         ftpPool.release(client);
//         console.log('5. Conexión liberada y promesa resuelta');
//       });
//     });
//   } catch (error) {
//     console.error('Error al adquirir una conexión FTP:', error);
//     throw error;
//   }
// };



module.exports = { uploadFile };

