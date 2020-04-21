console.log('Client side javascripts')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageSecond.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageSecond.textContent = data.forecast
            }
        })
    })
})