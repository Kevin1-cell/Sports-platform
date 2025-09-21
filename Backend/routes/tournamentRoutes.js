const {
  createTournament,
  listTournaments,
  getTournament,
  updateTournament,
  deleteTournament
} = require('../controllers/tournamentController');

const router = require('express').Router();

router.post('/tournaments', createTournament);
router.get('/tournaments', listTournaments);
router.get('/tournaments/:id', getTournament);
router.put('/tournaments/:id', updateTournament);
router.delete('/tournaments/:id', deleteTournament);

module.exports = router;
