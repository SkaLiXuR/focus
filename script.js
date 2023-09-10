const greetingElement = document.querySelector('.greeting')
const weekDayElement = document.querySelector('.week-day')
const monthDayElement = document.querySelector('.month-day')
const yearElement = document.querySelector('.year')
const hoursMinutesElement = document.querySelector('.hours-minutes')
const secondsElement = document.querySelector('.seconds')
const dayPeriodElement = document.querySelector('.day-period')
const quoteElement = document.querySelector('.quote')

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'June',
  'July',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
]

{
  let date = new Date()
  let hours = date.getHours()

  if (hours >= 4 && hours < 12) {
    greeting = 'Good morning.'
  }
  if (hours >= 12 && hours < 18) {
    greeting = 'Good afternoon.'
  }
  if (hours >= 18 || hours < 4) {
    greeting = 'Good evening.'
  }
  greetingElement.innerHTML = greeting
}

let count = 1
async function newQuote() {
  let data = await fetch('https://api.quotable.io/quotes/random?maxLength=99')
  data = await data.json()
  quoteElement.dataset.change = count + 1
  setTimeout(() => {
    quoteElement.innerHTML = `“${data[0].content}”
    ― ${data[0].author}`
  }, 500)
  count++
  count %= 2
}

// Spoof time
// let i = 1694321920000
// let date = new Date(i)
// setInterval(() => {
//   i += 1000
//   date = new Date(i)
// }, 1000)

setInterval(() => {
  let date = new Date()

  let seconds = date.getSeconds()
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let dayPeriod = ''
  let weekDay = date.getDay()
  let month = date.getMonth()
  let monthDay = date.getDate()
  let year = date.getFullYear()

  let greeting = ''
  let minutesHours = ''

  // Greeting
  if (hours >= 4 && hours < 12) {
    if (greetingElement.innerHTML !== 'Good morning.') {
      greetingElement.dataset.change = 1
    }
    greeting = 'Good morning.'
  }
  if (hours >= 12 && hours < 18) {
    if (greetingElement.innerHTML !== 'Good afternoon.') {
      greetingElement.dataset.change = 2
    }
    greeting = 'Good afternoon.'
  }
  if (hours >= 18 || hours < 4) {
    if (greetingElement.innerHTML !== 'Good evening.') {
      greetingElement.dataset.change = 3
    }
    greeting = 'Good evening.'
  }

  // Seconds
  seconds = `${seconds < 10 ? '0' : ''}${seconds}`
  // Hours, Minutes & Day period
  if (hours > 12) {
    dayPeriod = 'PM'
    hours = hours - 12
  } else if (hours === 0) {
    dayPeriod = 'AM'
    hours = 12
  } else {
    dayPeriod = 'AM'
  }
  minutesHours += `${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
  // Quote

  if (
    hours !==
    parseInt(
      `${hoursMinutesElement.innerHTML[0]}${hoursMinutesElement.innerHTML[1]}`
    )
  )
    newQuote()
  // Day of the week
  weekDay = weekDays[weekDay]
  // Day & Month
  monthDay = `${months[month]} ${monthDay < 10 ? '0' : ''}${monthDay}`

  secondsElement.innerHTML = seconds
  hoursMinutesElement.innerHTML = minutesHours
  dayPeriodElement.innerHTML = dayPeriod
  weekDayElement.innerHTML = weekDay
  monthDayElement.innerHTML = monthDay
  yearElement.innerHTML = year
  setTimeout(() => {
    greetingElement.innerHTML = greeting
  }, 500)
}, 1000)
