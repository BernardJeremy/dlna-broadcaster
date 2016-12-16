var electron = require('electron');
var startServer = electron.remote.require('./server').startServer;
var started = false;

$(document).ready(function() {
  $( ".file-uploader" ).submit(function( event ) {
      event.preventDefault();
      
      var listItems = $(".file-list li");
      var directoriesArray = []
      listItems.each(function(idx, currentLI) {
        var dir = $(currentLI).find('.file-list__name').html();
        directoriesArray.push({
            name: dir,
            path: $(currentLI).data('path'),
        })
      });

      startServer(directoriesArray, function(err, msg) {
          $('.file-uploader__submit-button').val(msg);
      });
  });
});