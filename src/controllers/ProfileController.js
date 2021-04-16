const User = require('../model/User')

module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await User.get() })
  },

  async update(req, res) {
    const data = req.body

    // definir quantidade de semanas num ano
    const weeksPerYear = 52
    // remover as semanas de férias do ano, para pegar quantas semanas tem em um mês (média)
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

    // total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    // horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth

    // valor da hora
    const valueHour = data["monthly-budget"] / monthlyTotalHours

    const user = await User.get()

    await User.update({
      ...user,
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('/profile')
  }
}