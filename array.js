var fruits=["banana","orange","apple","mango"];
function loadfruits(){
	document.getElementById("fruits").innerHTML=fruits;
}
function myfunction(){
	var fruit=prompt("what is your favourite food?");
	fruits[fruits.length]=fruit;
	document.getElementById("fruits").innerHTML=fruits;
}