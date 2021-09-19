//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const fetch = require('node-fetch')
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(8000,async () => {
    console.log('%s listening at 8000');
    try{
      await fetch('https://pi-food-api.herokuapp.com:8000/types')
      console.log("Tipos de dietas precargados!")
    }
    catch{
      console.log("Tipos de dietas no cargaron!")
    }
     // eslint-disable-line no-console
  });
});
