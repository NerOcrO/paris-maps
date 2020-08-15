(() => {
  'use strict'

  const $ = (selector) => document.querySelector(selector)
  const $$ = (selector) => document.querySelectorAll(selector)
  const $search = $('.rer .search')
  const $form = $('.rer form')
  const textFocusColor = 'red'
  const getLine = (node) => {
    const span = document.createElement('span')
    const lineB = '#6699cc'
    const lineC = '#ffcc00'
    const lineD = '#009966'
    const lineE = '#ff99cc'
    let fill = node.previousElementSibling.getAttribute('fill')
    let text = 'A'
    let class2 = 'a'

    if (fill === null) {
      const id = node.previousElementSibling.getAttribute('data-id')
      fill = $(`#${id} stop`).attributes.style.nodeValue.match(/stop-color:(#[a-z0-9]*)/)[1]
    }

    if (fill === lineB) {
      text = 'B'
      class2 = 'b'
    }
    else if (fill === lineC) {
      text = 'C'
      class2 = 'c'
    }
    else if (fill === lineD) {
      text = 'D'
      class2 = 'd'
    }
    else if (fill === lineE) {
      text = 'E'
      class2 = 'e'
    }

    span.classList.add(class2)
    span.appendChild(document.createTextNode(text))

    return span
  }
  const $$text = Array.from($$('.rer text')).filter((text) => text.childElementCount)
  const stations = $$text.map((text) => ({ name: text.textContent, fill: getLine(text) }))
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
          text.setAttribute('fill', textFocusColor)
          text.previousElementSibling.classList.add('toggle')
          text.previousElementSibling.setAttribute('r', '20')
          event.currentTarget.parentNode.remove()
        }
      })
    }
    const createStationList = (station) => {
      const li = document.createElement('li')
      const textNode = document.createTextNode(station.name)
      li.setAttribute('data-station', station.name)
      li.appendChild(station.fill)
      li.appendChild(textNode)
      li.addEventListener('click', showTheStation)
      ul.appendChild(li)
    }

    validStations.forEach(createStationList)

    $form.appendChild(ul)
  }

  $search.addEventListener('keyup', autocomplete)
})()
