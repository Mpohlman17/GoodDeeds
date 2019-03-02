$('#searchBtn').on('click', function (event) {
  event.preventDefault()
  const key = '6e6269f3d39bb81c4b37878dfaaef2f6'
  let id = 'aa69566f'
  let zip = $('#zipCodeInput').val()
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

        $('#charity-info').prepend(infoCard)
      }
    })
})
