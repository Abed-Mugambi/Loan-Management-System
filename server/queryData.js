const { connectDatabase } = require('./pool.js');

(async () => {
  const pool = connectDatabase();
  try {
    const result = await pool.query('SELECT * FROM borrowers');
    console.log(result.rows);
  } catch (err) {
    console.error(err.stack);
  } finally {
    await pool.end();
  }
})();