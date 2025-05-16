import pg from 'pg';

const connectDatabase = () => {
  return new pg.Pool({
    user: 'postgres',
    password: 'root',
    database: 'loan_management',
    host: 'localhost',
  });
};

export { connectDatabase };
