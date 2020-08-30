import "../sass/main.sass";
import $ from "jquery";
import select from "./select.js";

select();

$(".file-input .file-input__input").change(function (e) {
  if ($(this).closest(".file-input__wrap-multiple").length > 0) {
    $(this).closest(".file-input__wrap").find(".file-input__preview").html("");
    Array.from(this.files).forEach((image) => {
      let file = new FileReader();
      file.readAsDataURL(image);

      file.onloadend = (event) => {
        $(this).closest(".file-input__wrap").find(".file-input__preview")
          .append(`
				<a data-fancybox="upload" href="${event.target.result}" class="img-preview">
					<div class="img-preview__overlay"></div>
					<i class="fas fa-link img-preview__icon"></i>
					<img src="${event.target.result}" class="img-preview__img">
				</a>
				`);
      };
    });
  } else {
    $(this).parent().find(".file-input__label").html(this.files[0].name);

    let file = new FileReader();
    file.readAsDataURL(this.files[0]);

    file.onloadend = (event) => {
      $(this)
        .closest(".file-input__wrap")
        .find(".file-input__preview-img")
        .attr("src", event.target.result);
    };
  }
});

$(".popup-link").click(function (e) {
  e.preventDefault();

  $(".popup.active").removeClass("active");
  $($(this).attr("href")).addClass("active");
});

$(".popup__overlay, .popup__form-close").click(function (e) {
  e.preventDefault();

  $(this).closest(".popup").removeClass("active");
});

$(".header__nav-toggle").click(function (e) {
  e.preventDefault();

  $(this).toggleClass("active");
  $(".header__nav").toggleClass("active");
});

$(".input--autocomplete input").keyup(function (e) {
  let value = this.value;
  $(this)
    .closest(".input--autocomplete")
    .find(".input--autocomplete__item")
    .addClass("hidden");
  $(this)
    .closest(".input--autocomplete")
    .find(".input--autocomplete__item")
    .each(function () {
      if ($(this).text().includes(value)) $(this).removeClass("hidden");
    });
});
