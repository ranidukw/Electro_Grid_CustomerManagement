$(document).ready(function(){
	$("#alertSuccess").hide();
	$("#alertError").hide();
}); 
// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateCustomerForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	$.ajax(
		{
			url: "CustomerAPI",
			type: type,
			data: $("#formCustomer").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onCustomerSaveComplete(response.responseText, status);
			}
		});
});

function onCustomerSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") 
		{
			
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
			
		} else if (resultSet.status.trim() == "error") {
			
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}



// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
$("#hidItemIDSave").val($(this).data("cID")); 
 $("#cName").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#cAddress").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#cPhone").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#cEmail").val($(this).closest("tr").find('td:eq(3)').text()); 
 $("#cType").val($(this).closest("tr").find('td:eq(4)').text());
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateCustomerForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var typ = ($("#hidItemIDSave").val() == "") ? "" : "PUT";
	var ide = 2;
	$.ajax(
		{
			url: "CustomerAPI",
			type: typ,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: `cName=+${encodeURIComponent(cName)}`+`&cAddress=+${encodeURIComponent(cAddress)}`+`&cPhone=+${encodeURIComponent(cPhone)}`+`&cEamil=+${encodeURIComponent(cEmail)}`+`&cType=+${encodeURIComponent(cType)}`+`&id=+${encodeURIComponent(ids)}`,
			data: $("#formCustomer").serialize(),
			dataType: "text",
			complete: function(response, status) {
				onCustomerSaveComplete(response.responseText, status);
			}
		});
});




$(document).on("click", ".btnRemove", function(event) {
	
	var ids = 1;
	$.ajax(
		{
			url: "CustomerAPI",
			type: "DELETE",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			data: `id=+${encodeURIComponent(ids)}`,
			//data: "id=" + $(this).data("id"),
			//dataType: "text",
			complete: function(response, status) {
				onItemDeleteComplete(response.responseText, status);
			}
		});
});

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}
// CLIENT-MODEL================================================================
function validateCustomerForm() {
	// Name
	if ($("#cName").val().trim() == "") {
		return "Insert Customer Name.";
	}
	// Address
	if ($("#cAddress").val().trim() == "") {
		return "Insert Address.";
	}
	// Phone
	if ($("#cPhone").val().trim() == "") {
		return "Insert Phone No.";
	}
	
	// Email-------------------------------
	if ($("#cEmail").val().trim() == "") {
		return "Insert Email.";
	}
	
	// Type-------------------------------
	if ($("#cType").val().trim() == "") {
		return "Insert Type.";
	}
	
	
	// convert to decimal price
//	$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));
	
	return true;
}
