export default () => ({
  database: {
    uri: process.env.DB_URI || 'mongodb://root:root@mongodb/reservations',
  },
});
