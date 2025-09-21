const { db } = require('../firebase/firebase');
const Tournament = require('../models/tournamentModel');

// Crear torneo
async function createTournament(req, res) {
  try {
    const torneo = new Tournament(req.body);
    const docRef = await db.collection('tournaments').add({ ...torneo });
    res.status(201).json({ id: docRef.id, ...torneo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Listar torneos
async function listTournaments(req, res) {
  try {
    const snapshot = await db.collection('tournaments').get();
    const torneos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(torneos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Ver detalles de un torneo
async function getTournament(req, res) {
  try {
    const { id } = req.params;
    const doc = await db.collection('tournaments').doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Actualizar torneo
async function updateTournament(req, res) {
  try {
    const { id } = req.params;
    await db.collection('tournaments').doc(id).update(req.body);
    const updatedDoc = await db.collection('tournaments').doc(id).get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar torneo
async function deleteTournament(req, res) {
  try {
    const { id } = req.params;
    await db.collection('tournaments').doc(id).delete();
    res.status(200).json({ message: `Torneo ${id} eliminado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createTournament,
  listTournaments,
  getTournament,
  updateTournament,
  deleteTournament
};

