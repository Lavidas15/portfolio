document.getElementById("guess").onclick = function(){
    var numberInputByUser = document.getElementById('textNumber').value;
    var randomNumber = Math.floor(Math.random() * 6);
    console.log(randomNumber);
if (numberInputByUser == randomNumber){
    alert('Congrats! You find it! Well done!');
}else{
    alert("Try again!");
}
}