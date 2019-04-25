$(function() {
  var csrftoken = getCookie('csrftoken');

  function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
  }

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function submitFormData(event) {
     event.preventDefault();
    var form = $(this);
    var data = getFormData(form);
    var endPoint = form[0] ? form[0].id : null;
    data['form_id'] = endPoint
    console.log(endPoint);
    if (endPoint) {
       $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "InquiryForm",
      headers:{
        "X-CSRFToken": csrftoken
      },
      data: JSON.stringify(data),
      success: function (response, status) {
        if (response.error) {
          $("#sendInquiryResponse").addClass("alert alert-warning");  
          $("#sendInquiryResponse").css('display','block');
          $("#sendInquiryResponse").html("<p>" + response.error.message +  form_id + "</p>");
        }
        else {
          $("#sendInquiryForm").hide();
          $("#sendInquiryResponse").css('display','block');
          $("#sendInquiryResponse").html("<p>" + response.message + response.form_id + "</p>");
        }
      },
      error: function(response, error) {
        console.log(response);
        console.log(status);
      }
    });
    }
    else {
      console.log("Bad End Point")
    }
  }

  $( "#sendInquiryForm").submit(submitFormData);
  $("#supportForm").submit(submitFormData);
  $("#subscribeForm").submit(function(event) {
    event.preventDefault();
    var form = $(this);
    var data = getFormData(form);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      url: "subscribeForm",
      headers:{
        "X-CSRFToken": csrftoken
      },
      data: JSON.stringify(data),
      success: function (response, status) {
        if (response.error) {
          console.log(response);
        console.log(status);
          if (response.error.code == 0) {
            $("#subscribeResponse").addClass("alert alert-warning");
            $("#subscribeResponse").html("<p>" + response.error.message + "</p>");
          }
          else if (response.error.code == 1) {
            $("#subscribeForm").hide();
            $("#subscribeResponse").addClass("alert alert-warning");
            $("#subscribeResponse").html("<p>" + response.error.message + "</p>");
          }
        }
        else {
          $("#subscribeForm").hide();
          $("#subscribeResponse").addClass("alert alert-success");
          $("#subscribeResponse").html("<p>" + response.message + "</p>");
        }
      },
      error: function(response, error) {
        console.log(response);
        console.log(status);
      }
    });
  });


}); 
