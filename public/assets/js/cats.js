// // Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(() => {
  var a = $('.search').data("id")
  console.log(a)
  $('.search').attr('href', '/category/'+a)
})


$(function() {
  $(".change-complete").on("click", function(event) {
    var id = $(this).data("id");
    var newBool = !$(this).data("done");
    console.log('hiiii: ' + !newBool)

    var newState = {
      done: newBool
    };

    // Send the PUT request.
    $.ajax("/api/list/" + id, {
      type: "PUT",
      data: newState
    }).then(
      function() {
        console.log("Task is done? ", newState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // $(function () {  
  //   $(".search").on('click', function (event) {  
  //     // var cat = {
  //       cat =  $(this).data("id")
        
  //       $(this).attr('href', "/category/"+cat)

  //     // }
  //     // console.log(cat.category)
  //     $.ajax("/category/"+cat, {
  //       type: "GET",
  //       // data: cat
  //     }).then(
  //       function() {
  //         // Reload the page to get the updated list
  //         location.reload("category");
  //       }
  //     );
  //     // })
  //   })
  // })

  $(function () {  
     $(".remove-task").on('click', function(event) {
    var id = $(this).data("id");
    console.log(id)

    $.ajax("/api/list/" + id, {
      type: "DELETE",
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  })
  })
 

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();


    if($("#newCategory").val().trim().length > 0) var category = $("#newCategory").val().trim()
    else if($("#category").val().trim().length > 0) var category = $("#category").val().trim()
    else var category = null;

    var newTask = {
      item_name: $("#ca").val().trim(),
      category: category,
      done: $("[name=done]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/list", {
      type: "POST",
      data: newTask
    }).then(
      function() {
        console.log("created new task");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});