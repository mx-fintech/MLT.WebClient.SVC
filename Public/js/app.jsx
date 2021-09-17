'use strict'
const CORE_URL = 'https://kakupay.space';
let zip_code 
window.unload = function (e) {
  e.preventDefault();
  const choice = prompt('Are you sure you\'ld like to exit the System?');
}
$(document).ready(() => {
  
  $(".ui.dropdown").dropdown()
  $(".phone-field").keyup(function (e) {
    var sliced = $(this).val().slice(0, 4)
    if (sliced != zip_code && sliced != "+255" && sliced != "+260") {
      $(this).val(zip_code);
    }
  });
  $(".phone-field").keydown(function (e) {
    if ($(this).val() == zip_code) {
      var x = e.which || e.keycode;
      if (e.keyCode == 48) {
        try {
          Toastify({
            text: "Remember not to include zero (0) to the phone number!",
            duration: 4000,
            gravity: "top", // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            backgroundColor: "rgb(11, 89, 134)",
            className: "info",
          }).showToast();
        } catch (e) {
          swal("Remember not to include zero (0) to the phone number");
        }
        e.preventDefault();
      }
    } else if ((x >= 48 && x <= 57) || x == 8 || (x >= 35 && x <= 40) || x == 46) {
      e.preventDefault();
    }
  });
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function load(text) {
  $('body').loadingModal({
    text,
    animation: 'cubeGrid'
  });
}

function stopLoad() {
  $('body').loadingModal('hide');
  $('body').loadingModal('destroy');
}

function uploadFile(file, endpoint, fileTypes, maxFileSize, callback) {
  const property = document.getElementById(file).files[0];
  if (property) {
    var filename = property.name;
    var filesize = property.size;
    var file_ext = filename.split(".").pop().toLowerCase();
    if (jQuery.inArray(file_ext, fileTypes) == -1) {
      swal("", "Invalid file type", "error");
      //20000000
      callback('error');
    } else if (filesize > maxFileSize) {
      swal("", "File too large", "error");
      callback('error')
    } else {
      var form_data = new FormData();
      form_data.append('file', property);
      $.ajax({
        url: `${baseURL}${endpoint}`,
        method: "POST",
        contentType: false,
        data: form_data,
        cache: false,
        processData: false,
        dataType: "json",
        beforeSend: () => {
          load('Uploading file...')
        },
        success: (response) => {
          stopLoad();
          swal('', response.message, response.status);
          if (response.status == "success") {
            callback(response.filename);
          } else {
            callback("error");
          }
        },
        error: (xht, error, e) => {
          stopLoad()
          swal('Upload Error!', "Error " + xht.status + ": " + e, "error");
          callback("error");
        }
      });
    }
  } else {
    callback("error");
  }
}

function GetFormData(form) {
  let form_data = $("#" + form).serializeArray();
  let json_obj = {};
  $.each(form_data, function (i, v) {
    json_obj[v.name] = v.value;
  });
  return json_obj;
}

function passwordConfirm(message, callback) {
  swal({
    title: "Authorize!",
    text: message,
    type: "input",
    showCancelButton: true,
    closeOnConfirm: true,
    confirmButtonText: 'Authorize!',
    inputType: 'password',
    inputPlaceholder: "Enter Authorization PIN..."
  }, function (inputValue) {
    if (inputValue || inputValue != "" || inputValue != null || inputValue != typeof undefined) {
      callback(inputValue);
    }
  });
}

function readURL(input, callback) {
  if (input.files.length > 0 && input.files.length <= 4) {
    var reader = new FileReader();
    reader.onload = function (e) {
      //console.log(e.target.result); 
      //$(`#${canvas}`).css("background-image", `url(${e.target.result})`).transition('jiggle');
      callback(e.target.result)
    }
    reader.readAsDataURL(input.files[0]);
  }
}


function Toast(uthenga, status) {
  if (status == "error") {
    $('body').toast({
      title: "Error!",
      class: 'error',
      showProgress: 'top',
      classProgress: 'blue',
      message: uthenga,
      displayTime: 5000,
    });
  } else if (status == "success") {
    $('body').toast({
      title: "Success!",
      class: 'success',
      showProgress: 'bottom',
      message: uthenga,
      displayTime: 5000,
    });
  } else if (status == "warning") {
    $('body').toast({
      title: "Attention!",
      class: 'warning',
      showProgress: 'bottom',
      message: uthenga,
      displayTime: 5000,
    });
  } else if (status == "default") {
    $('body').toast({
      title: "Hey!,",
      class: 'blue',
      showProgress: 'bottom',
      message: uthenga,
      displayTime: 5000,
    });
  }
}

function PresetZip (){
    let element = $("option:selected", this)
    zip_code = element.attr("zip")
    //alert(zip_code)
    $("#phone_number").val(zip_code)
}