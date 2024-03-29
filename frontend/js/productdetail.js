$(function () {

    var searchParams = new URLSearchParams(window.location.search);
    var pid = searchParams.get("pid");
    var url = "/api/products/" + pid;

    // Get data when first time open
    getData();

    function getData() {
        // #14 Get a selected product and display as a form
        // use $.get
        $(document).ready(function() {
            $("#AttorneyEmpresa").change(function(){
                $.ajax({
                    type: 'POST',
                    data:  {keyname:$('#AttorneyEmpresa option:selected').val()}
                });
            });
        });
        // ===============================
    }

    // Update photo when URL has changed
    $("#photo").change(function () {
        $("#preview").attr("src", $("#photo").val());
    })

    // Save edited product data
    $("#saveproduct").click(function () {
        $.ajax({
            url: url,
            type: 'PUT',
            data: editproduct,
            success: function (result) {
                //Show updated status
                $("#modalbody").text("Updated product " + pid);
                $('#alertModal').modal('toggle');
                // Refresh data
                getData();
            }
        });
    });

    $("#deleteproduct").click(function () {
        $('#confirmModal').modal('toggle');
    });

    $("#confirmdelete").click(function () {
        // #15 Get a selected product and go back to product list
        $("#saveproduct").click(function () {
            var deleteproduct = {
                serialno: $("#serialno").val(),
                name: $("#name").val(),
                category: $("#category").val(),
                price: $("#price").val(),
                photo: $("#photo").val()
            }
            $.ajax({
                url: url,
                type: 'DELETE',
                data: deleteproduct,
                success: function (result) {
                    //Show delete status
                    $("#modalbody").text("Delete product " + pid);
                    $('#alertModal').modal('toggle');
                    // Refresh data
                    getData();
                }
            });
        });
        // ===============================
    });
});