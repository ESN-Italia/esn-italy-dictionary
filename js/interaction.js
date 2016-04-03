$(function () {
  // ID of the Google Spreadsheet
  //https://docs.google.com/spreadsheets/d/10z3kwGXRzjqd2Y3V35cyFyMAIQ-R-SEk0FNOIfI0zis/pubhtml
  var spreadsheetID = "10z3kwGXRzjqd2Y3V35cyFyMAIQ-R-SEk0FNOIfI0zis";

  // Make sure it is public or set to Anyone with link can view 
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  var cardTemplate = $('#dictionary__entry').html();

  $.getJSON(url, function(result) {

    var entries = result.feed.entry.map( function (entry) {
          
      var card = $($('<div>').html(cardTemplate).children()[0]);

      card.find('.dictionary__phrase').text(entry.gsx$phrase.$t);
      card.find('.dictionary__type').text(entry.gsx$type.$t);
      card.find('.dictionary__grammar').text(entry.gsx$grammar.$t);
      card.find('.dictionary__description').text(entry.gsx$numbereddescription.$t);
      card.find('.dictionary__usage').text(entry.gsx$usageexample.$t);

      entry.gsx$anchor.$t != "" ? card.find('.dictionary__anchor').attr("name", entry.gsx$anchor.$t.toLowerCase()) : null;

      return card;

    });

    $('#dictionary__entries').html(entries);

      window.sr = ScrollReveal({ reset: true, duration: 1000, mobile: false });
      sr.reveal( '.animate' );

  });
});