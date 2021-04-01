const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Fabiana",
    avatar: "https://github.com/fabianapduarte.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75
  },

  constrollers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
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
      data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

      Profile.data = data

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      createdAt: Date.now()
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      createdAt: Date.now()
    }
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
    
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })
    
      return res.render(views + "index", { jobs: updatedJobs })
    },
    
    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 1

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createdAt: Date.now()
      })
    
      return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

      return res.render(views + "job-edit", { job })
    },

    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find(job => Number(job.id) === Number(jobId))

      if (!job) {
        return res.send('Job not found')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"]
      }

      Job.data = Job.data.map(job => {
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      })

      return res.redirect('/job/' + jobId)
    }
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //retorna string
    
      const createdDate = new Date(job.createdAt)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMs - Date.now()
      // transformar milisegundos em dias
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
      // restam x dias
      return dayDiff
    }, 

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
  }
}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)

routes.get('/profile', Profile.constrollers.index)
routes.post('/profile', Profile.constrollers.update)

module.exports = routes