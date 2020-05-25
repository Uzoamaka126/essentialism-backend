if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

// require('dotenv').config();
const server = require('./app');
const config = require('./Config')

// const port = process.env.PORT || 5000;
const PORT = config.PORT;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})