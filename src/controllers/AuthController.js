const User = require('../model/User')

module.exports = {
  signIn(req, res) {
    res.render("login")
  },

  authenticate(req, res) {
    
  },

  signUp(req, res) {
    res.render("register")
  },

  async register(req, res) {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      "monthly_budget": req.body["monthly-budget"],
      "days_per_week": req.body["days-per-week"],
      "hours_per_day": req.body["hours-per-day"],
      "vacation_per_year": req.body["vacation-per-year"]
    })

    return res.redirect('/')
  }
}