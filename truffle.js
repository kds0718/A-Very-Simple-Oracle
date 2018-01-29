// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
  rinkeby: {
    host: "localhost", // Connect to geth on the specified
    port: 8545,
    from: "0x0c96d995018253C6DDb384E5eEbc7DC4e405371f", // default address to use for any transaction Truffle makes during migrations
    network_id: 4,
    gas: 4612388 // Gas limit used for deploys
  }
}
};
