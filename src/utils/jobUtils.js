module.exports = {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //retorna string
  
    const createdDate = new Date(job.createdAt)
    const dueDay = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDay)
  
    const timeDiffInMs = dueDateInMs - Date.now()
    // transformar milisegundos em dias
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
  
    // restam x dias
    return dayDiff
  }, 

  calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}