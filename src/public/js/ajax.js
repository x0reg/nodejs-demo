$(document).ready(function () {
  $("#ajaxSubmitForm").on("submit", function (e) {
    e.preventDefault();
    var url = $(this).attr("action"),
      method = $(this).attr("method"),
      data = $(this).serialize(),
      button = $(this).find("button[type=submit]");
    ajaxSetting(url, method, data, button);
  });
});
ajaxSetting = (url, method, data, button) => {
  const textButton = button.html().trim();
  $.ajax({
    url,
    type: method,
    data,
    processData: false,
    dataType: "JSON",
    beforeSend: function () {
      button
        .prop("disabled", !0)
        .html(
          '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang xử lý...'
        );
    },
    complete: function () {
      button.prop("disabled", !1).html(textButton);
    },
    success: function (data) {
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    },
  });
};
