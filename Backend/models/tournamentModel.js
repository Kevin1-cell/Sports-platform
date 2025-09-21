class Tournament {
  constructor({ name, description, startDate, endDate, maxTeams, rules }) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxTeams = maxTeams;
    this.rules = rules;
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Tournament;
