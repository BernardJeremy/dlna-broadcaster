var electron = require('electron');
var startServer = electron.remote.require('./server').startServer;

$(document).ready(function() {
  $( ".file-uploader" ).submit(function( event ) {
      event.preventDefault();
      
      var listItems = $(".file-list li");
      listItems.each(function(idx, currentLI) {
        var dir = $(currentLI).find('.file-list__name').html();
        console.log(dir, ':', $(currentLI).data('path'));
      });

      startServer();
  });
});