import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-wrapper">
        <motion.h2
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Organization Admin
        </motion.h2>

        <motion.button
          className="dashboard-button"
          onClick={() => navigate("/crear-torneo")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ➕ Create Tournament
        </motion.button>

        <motion.button
          className="dashboard-button"
          onClick={() => navigate("/torneos")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          📋 View Tournaments
        </motion.button>
      </div>
    </div>
  );
}

export default Dashboard;
