const mongoose = require('mongoose');
const mongodbUri = 'mongodb+srv://togautamji02:LJZA5nx3we0a6dUg@cluster0.nkbzqr3.mongodb.net/registartionDb';

const databaseConnection = function (callback) {
   mongoose
      .connect(mongodbUri, {
         useNewUrlParser: true,
         useUnifiedTopology: false,
      })
      .then((res) => {
         console.log('database connected');
         callback();
      })
      .catch((err) => {
         console.log(err);
      });
};

module.exports = databaseConnection;
