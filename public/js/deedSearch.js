// gets information for API search from page
$('#searchBtn').on('click', function (event) {
  event.preventDefault()
  let zip = $('#zipCodeInput').val()
  let mileage = $('#mileageInput').val()
  // clears data input from API's
  ClearFields()
  let searchOption = $('#selectorDropdown').val()
  console.log(searchOption)
  if (searchOption === 'Charity Events') {
    // event search function
    const token = 'LTV5SOWTS6QBZF72VGDA'
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

          $('#deed-info').prepend(infoCard)
        }
      })
  } else if (searchOption === 'Local Charities') {
    // charit search function
    const key = '6e6269f3d39bb81c4b37878dfaaef2f6'
    const id = 'aa69566f'
    let queryURL =
      'https://api.data.charitynavigator.org/v2/Organizations?app_id=' +
      id +
      '&app_key=' +
      key +
      '&pageSize=15&zip=' +
      zip

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        for (let i = 0; i < response.length; i++) {
          let charityName = response[i].charityName
          let charityCity = response[i].mailingAddress.city
          let charityAddress = response[i].mailingAddress.streetAddress1
          let charityUrl = response[i].charityNavigatorURL
          let charityFocus = response[i].irsClassification.nteeType
          let infoCard = $("<div class ='card'>")
          let eName = $("<div class='card-header'>").text(charityName)
          let infoCardBody = $("<div class='card-body'>")

          let charityFunction = $("<p class='card-text'>").text(
            'Cause:' + charityFocus
          )

          let charityLocale = $("<p class='card-text'>").text(
            'City: ' + charityCity
          )
          let charityPlace = $("<p class='card-text'>").text(
            'Address: ' + charityAddress
          )
          let charityLink = $('<a>').text('Additional Details')

          charityLink.attr('href', charityUrl)

          infoCard.append(eName, infoCardBody)
          infoCardBody.append(
            charityFunction,
            charityLocale,
            charityPlace,
            charityLink
          )

          $('#deed-info').prepend(infoCard)
        }
      })
  } else {
    alert('Please select charity or event from dropdown! :D')
  }
})

function ClearFields () {
  document.getElementById('deed-info').innerHTML = ''
  // document.getElementById('charity-info').innerHTML = ''
}
