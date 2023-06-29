$(document).ready(function () {
    // Вычисляем вчерашнюю дату
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    $("#dateFrom").datepicker({
      dateFormat: "dd.mm.yy",
      changeMonth: true,
      changeYear: true,
      defaultDate: yesterday, // Устанавливаем вчерашнюю дату по умолчанию
    });
  
    $("#dateTo").datepicker({
      dateFormat: "dd.mm.yy",
      changeMonth: true,
      changeYear: true,
      onSelect: function (dateText, inst) {
        $("#dateFrom").datepicker("option", "maxDate", new Date(dateText));
      },
      defaultDate: yesterday, // Устанавливаем вчерашнюю дату по умолчанию
    });
  });
  
  function showDateRange1() {
    var dateFrom = $("#dateFrom").datepicker("getDate");
    var dateTo = $("#dateTo").datepicker("getDate");
    console.log(
      "Selected date range: " +
        $.datepicker.formatDate("dd.mm.yy", dateFrom) +
        " - " +
        $.datepicker.formatDate("dd.mm.yy", dateTo)
    );
  }