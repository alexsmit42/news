$(function() {
  $('.hidden-content').hide();
});

$(document).ready(function() {

  // изменить цвет соц. кнопок
  $('.social img').hover(
    function() {
        $(this).attr('src', function(index, attr) {
          return attr.replace('-0.svg', '-1.svg');
        });
    },
    function() {
      $(this).attr('src', function(index, attr) {
        return attr.replace('-1.svg', '-0.svg');
      });
    }
  ); // end hover

  // развернуть спрятанный контент
  $('.expand h3').click(function() {
    $(this).closest('.expand').toggleClass('expanded');
    $(this).closest('.expand').find('.hidden-content').toggle(400);
  }); // end click

  // диалоговое окно для входа на сайт
  $('footer a').click(function() {
    $('#login').dialog('open');
  }); // end click
  $('#login').dialog({
    modal: true,
    autoOpen: false,
    draggable: false,
    resizable: false,
    zIndex: 300,
    show: {
      effect: 'fade',
      duration: 250,
    },
    hide: {
      effect: 'fade',
      duration: 250
    },
    open: function(event, ui) {
      $('.ui-widget-overlay').on('click', function() {
        $('#login').dialog('close');
      });
    },
    buttons: {
      "Войти": function(){
        $('#login form').submit();

        $(this).dialog('close');
      },
    } // end buttons
  }); // end dialog

}); // end ready
