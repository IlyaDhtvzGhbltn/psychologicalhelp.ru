var animationDictionary = { 
	500 : {"id" : "first-left-photo", "animation" : "animationNullMarg"},
	600 : {"id" : "top-about-par", "animation" : "animationRight"},

	601 : { "id" : "recept-id", "animation" : "animationJoinButton"},

	900 : { "id" : "paraf-width-exp", "animation" : "animationRightExpand"},
	1300 : { "id" : "right-crycis-cont", "animation" : "animationRight"},
	1350 : { "id" : "second-left-photo", "animation" : "animationNullMarg"},
	2200 : { "id" : "child-container-img", "animation" : "animationRight"},
	2100 : { "id" : "third-left-photo", "animation" : "animationRight"},
	2600 : { "id" : "personal-problem-img", "animation" : "animationNullMarg"},
	2700 : { "id" : "personal-problem-desc", "animation" : "animationRight"},
	3700 : { "id" : "service-align-container", "animation" : "animationAbout"},
	3701 : { "id" : "about-img", "animation" : "animationNullMarg"},
};

document.addEventListener("scroll", onScroll);
function onScroll() {
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	[].forEach.call( Object.getOwnPropertyNames(animationDictionary), function(elemKey){	
		if(scrollTop > elemKey)
		{
			var eID = animationDictionary[elemKey].id;
			var eClass = animationDictionary[elemKey].animation;
			
			var elem = document.getElementById(eID);
			if(!elem.classList.contains(eClass)){
				elem.classList.add(eClass);
			}
		}
	});
	if(scrollTop < 500)
	{
		var reButton = document.getElementById("join-button-ovveride");
		reButton.style.opacity = 0;
	}
	if(scrollTop > 500)
	{
		var reButton = document.getElementById("join-button-ovveride");
		reButton.style.opacity = 1;
	}
}

function scrollToElement(elementId){
	var elem = document.getElementById(elementId);
	elem.scrollIntoView({ behavior: 'smooth'});
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function CloseReForm(){
	var elem = document.getElementsByClassName("background-grey");
	elem[0].style.opacity = 0;	
	elem[0].style.display = "none";	
	
	var reform = document.getElementsByClassName("new-reception-form-container");
	reform[0].style.opacity = 0;
	reform[0].style.display = "none";
	
	var butt = document.getElementsByClassName("reception-form");
	butt[0].style.opacity = 1;
}

function ShowReForm(){
	var elem = document.getElementsByClassName("background-grey");
	elem[0].style.opacity = 1;	
	elem[0].style.display = "block";	
	
	var reform = document.getElementsByClassName("new-reception-form-container");
	reform[0].style.opacity = 1;
	reform[0].style.display = "block";
	
	var butt = document.getElementsByClassName("reception-form");
	butt[0].style.opacity = 0;
}

function ToReception()
{
	var name = $("#client-name").val();
	var phone = $("#client-phone").val();
	var email = $("#client-email").val();
	var problem = $("#client-problem-description").val();
	var request = {"name": name, "phone" : phone, "email":email, "problem":problem};
	
	var numbers = request.phone.replace(/[^0-9]/g, '');
	
	console.log(request.name.length);
	console.log(numbers);
	
	if(request.name.length <= 3 || numbers < 11)
	{
		$("#form-help").fadeOut();
		$("#form-help-error").fadeOut();
		$("#form-help-error").fadeIn();
	}
	if(request.name.length >= 3 && numbers >= 11)
	{
		$('#recept-now').remove();
		$('#form-help').text("Отправка...");
		$.ajax({
			url:"/api/reception.php",
			type: "post",
			data: request,
			success: function(resp){
				$("#form-help").fadeOut();
				$("#form-help-error").fadeOut();
				$("#form-help-correct").fadeIn();
				
				$("#client-name").val("");
				$("#client-phone").val("");
				$("#client-email").val("");
				$("#client-problem-description").val("");
			}
		});
	}
}

document.addEventListener('DOMContentLoaded', function(){
	$("#client-phone").mask("+9 (999) 999-99-99");
});


