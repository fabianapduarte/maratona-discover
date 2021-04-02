const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() })
  },

  update(req, res) {
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

    Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
    })

    return res.redirect('/profile')
  }
}