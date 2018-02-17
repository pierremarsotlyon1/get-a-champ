/**
 * Created by pierremarsot on 26/04/2017.
 */
$(document).ready(function () {
  var into = false;
  $(document).on("click", '.nav-sidebar-column-toggle', function (e) {
    if(!into){
      into = true;
      var elem = $(this);
      if (elem.hasClass('toggled-class')) {
        elem.removeClass('toggled-class');
      }
      else {
        elem.addClass('toggled-class');
      }

      elem = $('.nav-sidebar-column');
      if(elem.hasClass('active')){
        elem.removeClass('active');
      }
      else{
        elem.addClass('active');
      }
      into = false;
    }
  });

  $(document).on('click', '.hamburger-toggle', function(e){
    var menu = $('#menu1');
    if(menu.hasClass("hidden-xs")){
      menu.removeClass('hidden-xs');
    }
    else{
      menu.addClass('hidden-xs');
    }
  });
});