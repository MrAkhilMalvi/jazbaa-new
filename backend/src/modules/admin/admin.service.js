import pool from "../../config/db.js";

export const getUsers = async () => {
  const { rows } = await pool.query(`
    SELECT
      id,
      first_name,
      last_name,
      email,
      mobile,
      city,
      state,
      country,
      age_group,
      category,
      interests,
      consent,
      created_at
    FROM users
    ORDER BY created_at DESC
  `);

  return rows;
};