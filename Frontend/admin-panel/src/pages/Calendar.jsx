import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gapi } from "gapi-script";
import Header from "../components/Header";
import "../styles/Calendar.css";

const CLIENT_ID =
  "591704407107-lh3mjl4c9t9co83akvrco6v7vlguq37s.apps.googleusercontent.com";
const API_KEY = "AIzaSyDmvixL1GMLpRgba_hs1FMSSArB56LMjxc";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function Calendar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!window.gapi) {
      setError("Google API is not available");
      return;
    }

    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (!authInstance.isSignedIn.get()) {
            authInstance
              .signIn()
              .then(() => handleAuth())
              .catch((err) => {
                setError("Google sign-in failed");
                console.error(err);
              });
          } else {
            handleAuth();
          }
        })
        .catch((err) => {
          setError("Failed to initialize Google API");
          console.error(err);
        });
    });
  }, []);

  const handleAuth = () => {
    try {
      const googleUser = window.gapi.auth2.getAuthInstance().currentUser.get();
      const accessToken = googleUser.getAuthResponse().access_token;

      fetch("http://localhost:3000/set-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: accessToken }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("set-auth failed");
          setIsAuthenticated(true);
          loadEvents();
        })
        .catch((err) => {
          setError("Failed to connect to microservice");
          console.error(err);
        });
    } catch (err) {
      setError("Failed to retrieve Google token");
      console.error(err);
    }
  };

  const loadEvents = () => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => {
        setError("Failed to load events");
        console.error(err);
      });
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
          onClick={() => navigate("/torneos")}
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
          Tournament Calendar
        </motion.h2>

        {error && <p className="calendar-error">{error}</p>}

        {!isAuthenticated ? (
          <motion.p
            className="calendar-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🔐 Signing in with Google...
          </motion.p>
        ) : (
          <ul className="calendar-events">
            {events.map((ev) => (
              <li key={ev.id} className="calendar-event">
                <strong>{ev.summary}</strong>
                <br />
                {ev.start.dateTime || ev.start.date} →{" "}
                {ev.end.dateTime || ev.end.date}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}

export default Calendar;
