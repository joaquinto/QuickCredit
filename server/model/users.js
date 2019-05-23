const userQueries = {
  createUser: `INSERT INTO users(first_name, last_name, email, password, address, status, is_admin) 
  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,

  findUserByEmail: 'SELECT * FROM users WHERE email = $1',

  verifyUser: 'UPDATE users SET status = $1 WHERE email = $2 RETURNING *',

  updatePassword: 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',

  findUserById: 'SELECT * FROM users WHERE id = $1',
};

export default userQueries;
