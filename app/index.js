const app = require('./app');
const port = process.env.PORT || 3977;

app.listen(port, function () { // eslint-disable-line prefer-arrow-callback
  console.log(`App running on port ${port}.`);
});
