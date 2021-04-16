const Database = require('./config')

const initDb = {
  async init() {
    // inicia a conexão
    const db = await Database()

    // cria as tabelas
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    );`)

    await db.exec(`CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idUser INTEGER,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME,
      FOREIGN KEY (idUser) REFERENCES users(id)
    );`)

    // inserção de dados
    await db.run(`INSERT INTO users (
      name,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour,
      email,
      password
    ) VALUES (
      "Fabiana",
      "https://github.com/fabianapduarte.png",
      3000,
      5,
      5,
      4,
      75,
      "fabiana@email.com",
      "senha123"
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      idUser,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Pizzaria Guloso",
      1,
      2,
      1,
      1617514376018
    );`)

    await db.run(`INSERT INTO jobs (
      name,
      idUser,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "OneTwo Project",
      1,
      3,
      47,
      1617514376018
    );`)

    // fecha a conexão com o bd
    await db.close()
  }
}

initDb.init()