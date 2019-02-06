 $(function() {
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
          var csrftoken = getCookie('csrftoken');
        $( "#sendMailForm" ).submit(function( event ) {
          event.preventDefault();
          var form = $(this);
          var data = getFormData(form);
          data.message = $("#mailMessage").val();
          
          $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "mail",
            headers:{
                        "X-CSRFToken": csrftoken
                    },
            data: JSON.stringify(data['name']),
            success: function (response, status) {
             
              console.log(data);
              console.log(status);
            },
            error: function(response, error) {
			  // var err = eval("(" + xhr.responseText + ")");
			  // alert(err.Message);
			  
              console.log(data);
              console.log(status);
			}

          });
        });
       
        
       

      }); 