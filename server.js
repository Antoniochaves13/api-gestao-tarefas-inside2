const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Modelo NoSQL Mongoose
const TarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  status: { type: String, default: 'pendente' },
  createdAt: { type: Date, default: Date.now }
});
const Tarefa = mongoose.model('Tarefa', TarefaSchema);

// Rotas API REST
app.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.find().sort({ createdAt: -1 });
  res.json(tarefas);
});

app.post('/tarefas', async (req, res) => {
  const nova = await Tarefa.create(req.body);
  res.status(201).json(nova);
});

app.put('/tarefas/:id', async (req, res) => {
  const atualizada = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizada);
});

app.delete('/tarefas/:id', async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Apagada' });
});

// Conexão MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI);

app.listen(3000, () => console.log('API rodando na porta 3000'));
