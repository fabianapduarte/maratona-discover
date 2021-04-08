const Database = require('config')

// inicia a conexão
Database()


// cria as tabelas
Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthly_budget INT,
  days_per_week INT,
  hours_per_day INT,
  vacation_per_year INT,
  value_hour INT
);`)

Database.exec(`CREATE TABLE jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  daily_hours INT,
  total_hours INT,
  created_at DATETIME
);`)


// inserção de dados
Database.run(`INSERT INTO profile (
  name,
  avatar,
  monthly_budget,
  days_per_week,
  hours_per_day,
  vacation_per_year,
  value_hour
) VALUES (
  "Fabiana",
  "https://github.com/fabianapduarte.png,
  3000,
  5,
  5,
  4,
  75
);`)

Database.run(`INSERT INTO jobs (
  name,
  daily_hours,
  total_hours,
  created_at
) VALUES (
  "Pizzaria Guloso",
  2,
  1,
  1617514376018
);`)

Database.run(`INSERT INTO jobs (
  name,
  daily_hours,
  total_hours,
  created_at
) VALUES (
  "OneTwo Project",
  3,
  47,
  1617514376018
);`)


// fecha a conexão com o bd
Database.close()
