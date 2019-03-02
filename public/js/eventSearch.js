$('#searchBtn').on('click', function (event) {
  event.preventDefault()
  ClearFields()
  const token = 'LTV5SOWTS6QBZF72VGDA'
  let zip = $('#zipCodeInput').val()
  let mileage = $('#mileageInput').val()
  let queryURL =
    'https://www.eventbriteapi.com/v3/events/search/?location.address=' +
    zip +
    '&location.within=' +
    mileage +
    'mi&categories=111&token=' +
    token

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
      // Log the resulting object
      let results = response.events
      // extracting data for each event to push into cards
      for (var i = 0; i < results.length; i++) {
        let name = results[i].name.text
        let description = results[i].description.text
        let start = results[i].start.local
        let end = results[i].end.local
        let url = results[i].url
        // let showMore = "<div class='show-more'><a href='#'>Show more</a></div>"
        let infoCard = $("<div class ='card'>")
        let eventName = $("<div class='card-header'>").text(name)
        let infoCardBody = $("<div class='card-body'>")
        let eventDescription = $("<p class='card-text hideContent'>").text(
          'Description: ' + description
        )
        let eventStart = $("<p class='card-text'>").text('Start: ' + start)
        let eventEnd = $("<p class='card-text'>").text('End: ' + end)
        let eventLink = $('<a>').text('Tickets and Additional Details')

        eventLink.attr('href', url)

        infoCard.append(eventName, infoCardBody)
        infoCardBody.append(eventDescription, eventStart, eventEnd, eventLink)

        $('#event-info').prepend(infoCard)
      }
    })
})

function ClearFields () {
  document.getElementById('event-info').innerHTML = ''
  document.getElementById('charity-info').innerHTML = ''
}
