$("#add_user").submit(function(event){
    alert("Data successfully inserted.");
})

$('#update_user').submit(function(event){
    event.preventDefault(); //Prevents default render

    var unindexed_array = $(this).serializeArray();
    var data = {};
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value'];
    })

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        'method': "PUT",
        'data': data
    }

    $.ajax(request).done(function(response){
        alert("Data successfully updated.");
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            'method': "DELETE",
        }

        if(confirm("Do you want to delete this user?")){
            $.ajax(request).done(function(response){
                alert("User successfully deleted");
                location.reload();
            })
        }
    })
}