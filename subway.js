(() => {
  'use strict'

  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => document.querySelectorAll(selector)
  const $search = $('.subway .search')
  const $form = $('.subway form')
  const $$text = Array.from($$('.subway text')).filter((text) => text.childElementCount)
  const stations = $$text.map((text) => ({ name: text.textContent }))
  const textFocusColor = 'red'
  const autocomplete = (event) => {
    const stationList = $('#list')

    if (stationList) {
      stationList.remove()
    }

    if (event.currentTarget.value.length === 0) {
      return
    }

    const validStations = stations.filter((station) => station.name.toLowerCase().includes(event.currentTarget.value.toLowerCase()))
    const ul = document.createElement('ul')
    ul.id = 'list'
    const showTheStation = (event) => {
      $$text.forEach((text) => {
        if (text.textContent === event.currentTarget.getAttribute('data-station')) {
          text.firstChild.style.fill = textFocusColor
          text.lastChild.style.fill = textFocusColor
          text.firstChild.classList.add('toggle')
          text.lastChild.classList.add('toggle')
          event.currentTarget.parentNode.remove()
        }
      })
    }
    const createStationList = (station) => {
      const li = document.createElement('li')
      const textNode = document.createTextNode(station.name)
      li.setAttribute('data-station', station.name)
      li.appendChild(textNode)
      li.addEventListener('click', showTheStation)
      ul.appendChild(li)
    }

    validStations.forEach(createStationList)

    $form.appendChild(ul)
  }

  $search.addEventListener('keyup', autocomplete)
})()
