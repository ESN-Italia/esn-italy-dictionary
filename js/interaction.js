$(function() {
  // ID of the Google Spreadsheet (@mc is in the CIA folder)
  var spreadsheetID = '1iWZMs2t-Nf3EChVqhkBRN3xRJuqkTUYuebyD0tRKrYc';

  // Make sure it is public or set to Anyone with link can view
  var url = 'https://opensheet.elk.sh/' + spreadsheetID + '/1';

  var cardTemplate = $('#dictionary__entry').html();

  $.getJSON(url, function(result) {
    var entries = result.map(function(entry) {
      console.log(entry);
      var card = $(
        $('<div>')
          .html(cardTemplate)
          .children()[0]
      );

      card.find('.dictionary__phrase').text(entry.Termine);
      card.find('.dictionary__type').text(entry.Categoria);
      card.find('.dictionary__grammar').text(entry.Pronuncia);
      entry.Definizione.split('||').forEach(d => {
        card.find('.dictionary__description').append(`<li>${d}</li>`);
      });
      card.find('.dictionary__usage').text(entry.Esempio);

      entry.Ancora
        ? card.find('.dictionary__anchor').attr('name', entry.Ancora.toLowerCase())
        : null;

      return card;
    });

    $('#dictionary__entries').html(entries);

    window.sr = ScrollReveal({ reset: true, duration: 1000, mobile: false });
    sr.reveal('.animate');
  });
});
