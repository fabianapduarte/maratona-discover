const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const data = await db.get(`SELECT * FROM users`)

    await db.close()

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
      "email": data.email
    }
  },

  async update(newData) {
    const db = await Database()

    await db.run(`UPDATE users SET
      name = "${newData.name}",
      avatar = "${newData.avatar}",
      monthly_budget = ${newData["monthly-budget"]},
      days_per_week = ${newData["days-per-week"]},
      hours_per_day = ${newData["hours-per-day"]},
      vacation_per_year = ${newData["vacation-per-year"]},
      value_hour = ${newData["value-hour"]},
      email = "${newData.email}",
      password = "${newData.password}"
    WHERE id = 1
    `)

    await db.close()
  },

  async create(newUser) {
    const db = await Database()

    await db.run(`INSERT INTO users (
      name,
      email,
      password,
      avatar,
      monthly_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year
    ) VALUES (
      "${newUser.name}",
      "${newUser.email}",
      "${newUser.password}",
      "${newUser.avatar}",
      ${newUser["monthly_budget"]},
      ${newUser["days_per_week"]},
      ${newUser["hours_per_day"]},
      ${newUser["vacation_per_year"]}
    );`)

    await db.close()
  }
}