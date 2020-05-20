const express = require('express');
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// used to serve anything in public dir without a specific server endpoint route path
app.use(express.static('./Develop/public'));

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});