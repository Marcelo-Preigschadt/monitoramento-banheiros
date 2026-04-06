const db = require('../config/db');

exports.getBanheiros = async () => {
  const result = await db.query(`
    SELECT 
      b.id,
      b.nome,
      COUNT(u.id) AS usos,
      MAX(l.data_hora) AS ultima_limpeza
    FROM banheiros b
    LEFT JOIN usos u ON b.id = u.banheiro_id
    LEFT JOIN limpezas l ON b.id = l.banheiro_id
    GROUP BY b.id
    ORDER BY b.id
  `);
  return result.rows;
};

exports.registrarUso = async (banheiro_id) => {
  await db.query('INSERT INTO usos (banheiro_id) VALUES ($1)', [banheiro_id]);
};

exports.registrarLimpeza = async (banheiro_id) => {
  await db.query('INSERT INTO limpezas (banheiro_id) VALUES ($1)', [banheiro_id]);
};
