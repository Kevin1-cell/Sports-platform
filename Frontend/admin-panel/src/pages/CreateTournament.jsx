import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../styles/CreateTournament.css";

function CreateTournament() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    maxTeams: "",
    rules: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setMessage(`Tournament created: ${data.name}`);
      setForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        maxTeams: "",
        rules: "",
      });
    } catch (err) {
      setMessage("Error creating tournament");
    }
  };

  return (
    <div className="tournament-layout">
      <Header />
      <motion.div
        className="tournament-wrapper"
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
          className="tournament-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Create New Tournament
        </motion.h2>

        <motion.form
          className="tournament-form"
          onSubmit={handleSubmit}
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
            className="tournament-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Create Tournament
          </motion.button>
        </motion.form>

        {message && <p className="tournament-message">{message}</p>}
      </motion.div>
    </div>
  );
}

export default CreateTournament;
