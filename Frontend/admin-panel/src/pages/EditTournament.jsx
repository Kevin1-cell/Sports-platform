import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../styles/EditTournament.css";

function EditTournament() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    maxTeams: "",
    rules: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("editTournament");
    if (stored) {
      setForm(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/api/tournaments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/torneos");
    } catch (err) {
      alert("Error updating tournament");
    }
  };

  return (
    <div className="edit-layout">
      <Header />
      <motion.div
        className="edit-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className="back-button"
          onClick={() => navigate("/torneos")}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Back
        </motion.button>

        <motion.h2
          className="edit-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Edit Tournament
        </motion.h2>

        <motion.form
          className="edit-form"
          onSubmit={handleUpdate}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            name="name"
            placeholder="Tournament Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            required
          />
          <input
            name="maxTeams"
            type="number"
            placeholder="Maximum Teams"
            value={form.maxTeams}
            onChange={handleChange}
            required
          />
          <textarea
            name="rules"
            placeholder="Tournament Rules"
            value={form.rules}
            onChange={handleChange}
            required
          />
          <motion.button
            type="submit"
            className="edit-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Update Tournament
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default EditTournament;
