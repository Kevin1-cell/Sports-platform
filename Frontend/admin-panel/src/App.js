import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateTournament from './pages/CreateTournament';
import TournamentList from './pages/TournamentList';
import EditTournament from './pages/EditTournament';
import PrivateRoute from './components/PrivateRoute';
import TournamentCalendar from './pages/TournamentCalendar';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/crear-torneo" element={
          <PrivateRoute>
            <CreateTournament />
          </PrivateRoute>
        } />

        <Route path="/torneos" element={
          <PrivateRoute>
            <TournamentList />
          </PrivateRoute>
        } />

        <Route path="/editar-torneo/:id" element={
          <PrivateRoute>
            <EditTournament />
          </PrivateRoute>
        } />

        <Route path="/torneo/:id/calendar" element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
