(function($) {

  $.fn.uploader = function(options) {
    var settings = $.extend({
      MessageAreaText: "No directories selected.",
      MessageAreaTextWithFiles: "Directory List:",
      DefaultErrorMessage: "Unable to open this directory."
    }, options);

    var uploadId = 1;
    //update the messaging 
    $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

    //create and add the file list and the hidden input list
    var fileList = $('<ul class="file-list"></ul>');
    var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
    $('.file-uploader__message-area').after(fileList);
    $('.file-list').after(hiddenInputs);

    //when choosing a file, add the name to the list and copy the file input into the hidden inputs
    $('.file-chooser__input').on('change', function(e) {
      var file = e.target.files[0].path
      var fileName = (file.match(/([^\\\/]+)$/)[0]);

      //clear any error condition
      $('.file-chooser').removeClass('error');
      $('.error-message').remove();

       // move the 'real' one to hidden list 
        $('.hidden-inputs').append($('.file-chooser__input'));

        //insert a clone after the hiddens (copy the event handlers too)
        $('.file-chooser').append($('.file-chooser__input').clone({
          withDataAndEvents: true
        }));

        //add the name and a remove button to the file-list
        $('.file-list').append('<li data-path="' + file + '" style="display: none;"><span class="file-list__name">' + fileName + '</span><button class="removal-button" data-uploadid="' + uploadId + '"></button></li>');
        $('.file-list').find("li:last").show(800);

        //removal button handler
        $('.removal-button').on('click', function(e) {
          e.preventDefault();

          //remove the corresponding hidden input
          $('.hidden-inputs input[data-uploadid="' + $(this).data('uploadid') + '"]').remove();

          //remove the name from file-list that corresponds to the button clicked
          $(this).parent().hide("puff").delay(10).queue(function() {
            $(this).remove();
          });

          //if the list is now empty, change the text back 
          if ($('.file-list li').length === 0) {
            $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
          }
        });

        //so the event handler works on the new "real" one
        $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

        //update the message area
        $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

        uploadId++;
    });
  };
}(jQuery));

//init 
$(document).ready(function() {
  $('.fileUploader').uploader({
    MessageAreaText: "No directory selected. Please select a directory."
  });
});