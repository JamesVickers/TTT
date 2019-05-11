


//alert("hello");
function showModal() {
    $(".mobile-nav-modal")
      .removeClass("modal-hide")
      .addClass("modal-show");
  
    $("body").css("overflow", "hidden");
  }

function hideModal() {
  $(".mobile-nav-modal")
  .removeClass("modal-show")
  .addClass("modal-hide");

  $("body").css("overflow", "visible");
}

$("#openMenu").on("click", function() {
  //alert("clicked");
  showModal();
});

  $("#closeMenu").on("click", function() {
  hideModal();
});

//hide modal automatically if window is resized > 700px
$(window).resize(function () {
  if(window.matchMedia("(min-width: 700px)").matches) {
    hideModal();
  }
});
