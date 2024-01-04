export default () => ({
  database: {
    uri: process.env.DB_URI || 'mongodb://mongo:27017/sleepr',
  },
});
