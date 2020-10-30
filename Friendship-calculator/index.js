function lovecal() {
    const answer = document.getElementsByClassName('heading');


    var randomNumber = Math.random();
    randomNumber = randomNumber * 100;
    randomNumber = Math.floor(randomNumber) + 1;
    answer[0].innerText = randomNumber + "%";
    answer[0].style.visibility = 'visible';
}