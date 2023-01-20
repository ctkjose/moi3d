$(document).ready(function() {
  $("h2").each(function() {
    var html = $(this).html();
    $(this).html('<div class="t_box"><div class="t_top"><div></div></div><div class="t_content">' + html + '</div></div>');
  });
  $("h2 + div").addClass("sectionb").each(function() {
    var html = $(this).html();
    $(this).html('<div class="b_box"><div class="b_content">' + html + '</div><div class="b_bottom"><div></div></div></div>');
  });
  $("#htoggle").mouseover(function() {
      $(this).attr({src: "images/help2.png"});
  }).mouseleave(function() {
      $(this).attr({src: "images/help.png"});
  });
  $(".toggle, .mtoggle").mouseover(function() {
      $(this).attr({src: "images/eye2.png"});
  }).mouseleave(function() {
      $(this).attr({src: "images/eye.png"});
  });
  $(".toggle").click(function() {
      var name = $($(this).parent().get(0)).text().split(' ',1)[0];
      $("#" + name + " div.desc").toggleClass("hidden");
  });
  var desc_toggle = false;
  $(".mtoggle").click(function() {
      desc_toggle = !desc_toggle;
      if ( desc_toggle ) {
          $("div.desc").removeClass("hidden");
      } else {
          $("div.desc").addClass("hidden");
      }
  });
});
