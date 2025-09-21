import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import "../styles/TournamentList.css";

function TournamentList() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/tournaments")
      .then((res) => res.json())
      .then((data) => setTournaments(data))
      .catch(() => setError("Error loading tournaments"));
  }, []);

  const handleEdit = (tournament) => {
    localStorage.setItem("editTournament", JSON.stringify(tournament));
    navigate(`/editar-torneo/${tournament.id}`);
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/api/tournaments/${selectedId}`, {
        method: "DELETE",
      });
      setTournaments(tournaments.filter((t) => t.id !== selectedId));
      setShowModal(false);
      setSelectedId(null);
    } catch {
      setError("Error deleting tournament");
    }
  };

  const handleCalendar = (id) => {
    navigate(`/torneo/${id}/calendar`);
  };

  return (
    <div className="tournament-layout">
      <Header />
      <motion.div
        className="tournament-list-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className="back-button"
          onClick={() => navigate("/dashboard")}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Back
        </motion.button>

        <motion.h2
          className="tournament-list-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Created Tournaments
        </motion.h2>

        {error && <p className="tournament-error">{error}</p>}

        {tournaments.length === 0 ? (
          <p className="tournament-empty">No tournaments registered</p>
        ) : (
          <ul className="tournament-list">
            {tournaments.map((t) => (
              <li key={t.id} className="tournament-item">
                <strong>{t.name}</strong> — {t.startDate} to {t.endDate}
                <br />
                <em>{t.description}</em>
                <br />
                <small>{t.rules}</small>
                <br />
                <div className="tournament-actions">
                  <button onClick={() => handleEdit(t)}>✏️ Update</button>
                  <button onClick={() => confirmDelete(t.id)}>🗑️ Delete</button>
                  <button onClick={() => handleCalendar(t.id)}>
                    📅 Calendar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Are you sure you want to delete this tournament?</h3>
              <div className="modal-buttons">
                <button onClick={cancelDelete}>Cancel</button>
                <button onClick={handleDelete} className="danger">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TournamentList;
