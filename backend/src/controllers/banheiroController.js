const service = require('../services/banheiroService');

exports.getAll = async (req, res) => {
  const data = await service.getBanheiros();
  res.json(data);
};

exports.uso = async (req, res) => {
  const { banheiro_id } = req.body;
  await service.registrarUso(banheiro_id);
  res.json({ ok: true });
};

exports.limpeza = async (req, res) => {
  const { banheiro_id } = req.body;
  await service.registrarLimpeza(banheiro_id);
  res.json({ ok: true });
};
