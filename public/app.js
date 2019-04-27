//alert("hello");
function showModal() {
  $(".mobile-nav-modal")
    .removeClass("modal-hide")
    .addClass("modal-show");

  $("body").css("overflow", "hidden");
}

$("#openMenu").on("click", function() {
  showModal();
});
