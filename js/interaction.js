$(function() {
  // ID of the Google Spreadsheet (@mc is in the CIA folder)
  var spreadsheetID = '1iWZMs2t-Nf3EChVqhkBRN3xRJuqkTUYuebyD0tRKrYc';

  // Make sure it is public or set to Anyone with link can view
  var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/default/public/values?alt=json';

  var cardTemplate = $('#dictionary__entry').html();

  $.getJSON(url, function(result) {
    var entries = result.feed.entry.map(function(entry) {
      var card = $(
        $('<div>')
          .html(cardTemplate)
          .children()[0]
      );

      card.find('.dictionary__phrase').text(entry.gsx$termine.$t);
      card.find('.dictionary__type').text(entry.gsx$categoria.$t);
      card.find('.dictionary__grammar').text(entry.gsx$pronuncia.$t);
      // @mc enable multiple definitions
      entry.gsx$definizione.$t.split('||').forEach(d => {
        card.find('.dictionary__description').append(`<li>${d}</li>`);
      });
      card.find('.dictionary__usage').text(entry.gsx$esempio.$t);

      entry.gsx$ancora.$t != ''
        ? card.find('.dictionary__anchor').attr('name', entry.gsx$ancora.$t.toLowerCase())
        : null;

      return card;
    });

    $('#dictionary__entries').html(entries);

    window.sr = ScrollReveal({ reset: true, duration: 1000, mobile: false });
    sr.reveal('.animate');
  });
});
