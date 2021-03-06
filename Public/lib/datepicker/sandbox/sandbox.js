window.start = undefined
window.end = undefined
window.nope = undefined


document.addEventListener('DOMContentLoaded', () => {
  window.range = document.querySelector('input[type=range]')
  window.range.addEventListener('input', e => {
    const num = e.target.value / 10
    const el = document.querySelector('.qs-datepicker-container')
    el.style.setProperty('font-size', `${num}em`)
  })

  window.start = datepicker('.start', {
    id: 1,
    alwaysShow: 1,
    showAllDates: 1,
    events: [
      new Date(2019, 10, 1),
      new Date(2019, 10, 10),
      new Date(2019, 10, 20),
    ]
  })

  window.end = datepicker('.end', { id: 1 })

  //----------------------------------------

  window.nope = datepicker('.nope', {
    position: 'tr',
    alwaysShow: 1,
    events: [
      new Date(2019, 10, 1),
      new Date(2019, 10, 10),
      new Date(2019, 10, 20),
    ]
  })

  window.dp = datepicker('#dp')
})
