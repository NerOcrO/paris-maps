(() => {
  'use strict'

  const $ = selector => document.querySelector(selector)
  const $$ = selector => document.querySelectorAll(selector)
  const $$button = $$('button')
  const initColor = '#e7e7e7'
  const overlayColor = 'red'
  const toggleDistrict = (event) => {
    const district = $(`#${event.currentTarget.attributes['data-id'].nodeValue}`)

    if (district.attributes.fill.nodeValue === overlayColor) {
      district.attributes.fill.nodeValue = initColor
      event.currentTarget.className = ''
    }
    else {
      district.attributes.fill.nodeValue = overlayColor
      event.currentTarget.className = 'overlay'
    }
  }

  $$button.forEach((button) => {
    button.addEventListener('click', toggleDistrict)
  })
})()
