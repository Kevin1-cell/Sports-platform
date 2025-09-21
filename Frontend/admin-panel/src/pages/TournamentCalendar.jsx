import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../styles/TournamentCalendar.css";

function TournamentCalendar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    summary: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => setError("Failed to load events"));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ summary: "", start: "", end: "" });
      window.location.reload();
    } catch {
      setError("Failed to create event");
    }
  };

  return (
    <div className="calendar-layout">
      <Header />
      <motion.div
        className="calendar-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          className="back-button"
          onClick={() => navigate("/torneo/" + id + "/calendar")}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Back
        </motion.button>

        <motion.h2
          className="calendar-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Tournament Events
        </motion.h2>

        <motion.form
          className="calendar-form"
          onSubmit={handleCreate}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <input
            name="summary"
            placeholder="Event Title"
            value={form.summary}
            onChange={handleChange}
            required
          />
          <input
            name="start"
            type="datetime-local"
            value={form.start}
            onChange={handleChange}
            required
          />
          <input
            name="end"
            type="datetime-local"
            value={form.end}
            onChange={handleChange}
            required
          />
          <motion.button
            type="submit"
            className="calendar-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Create Event
          </motion.button>
        </motion.form>

        {error && <p className="calendar-error">{error}</p>}

        <ul className="calendar-events">
          {events.map((ev) => (
            <li key={ev.id} className="calendar-event">
              <strong>{ev.summary}</strong>
              <br />
              {ev.start} → {ev.end}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default TournamentCalendar;
