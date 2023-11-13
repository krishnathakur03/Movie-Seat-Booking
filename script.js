//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

const totalPrice = document.getElementById('totalPrice');
const numberOfSeat = document.getElementById('numberOfSeat');
let totalAmount = 0;
let seats = 0;

// Use moviesList array for displaing the Name in the dropdown menu
let ticketPrice = moviesList[0].price;
const selectedMovie = document.getElementById("selectMovie");
for (const movie of moviesList) {
    const makeOption = document.createElement('option');
    makeOption.classList.add('movies');
    makeOption.innerText = movie.movieName + " $" + movie.price;
    selectedMovie.appendChild(makeOption);
}

selectedMovie.addEventListener("change", (e) => {
    const movieName = document.getElementById('movieName');
    const moviePrice = document.getElementById('moviePrice');
    let abc = true;
    var moviena = '';
    var moviepa = '';
    let val = e.target.value;
    for (var i of val) {
        if (i != ' ' && abc) {
            moviena = moviena + i;
        } else if (i != '$') {
            abc = false;
            if (i != ' ') {
                moviepa = moviepa + i;
            }
        }
    }
    movieName.innerHTML = moviena;
    moviePrice.innerHTML = '$ ' + moviepa;
    ticketPrice = parseInt(moviepa);


    totalAmount = seats * ticketPrice;
    totalPrice.textContent = '$ ' + totalAmount;
    numberOfSeat.textContent = seats;
});

const seatCount = document.querySelectorAll('#seatCont .seat');
seatCount.forEach((val, i) => {
    val.textContent = i + 1;
    val.classList.add(`${i + 1}`)
    val.style.textAlign = 'center';
})


// Add eventLister to each unoccupied seat
const unoccupied = document.querySelectorAll('.row .seat:not(.occupied)');
const selectedSeats = document.querySelector('#selectedSeatsHolder');
// const noselected = document.querySelector('.noSelected');

unoccupied.forEach((val) => {
    val.addEventListener('click', () => {
        if (!val.classList.contains('occupied')) {
            if (val.classList.contains('selected')) {
                val.classList.remove('selected');
                removeSelectedSeat(val.innerText);
                seats -= 1;
            } else {
                val.classList.add('selected');
                if (document.querySelector('.noSelected')) {
                    const noselected = document.querySelector('.noSelected');
                    noselected.remove();
                }
                // noselected.remove();
                const selectedSeat = document.createElement('div');
                selectedSeat.classList.add('selectedSeat');
                selectedSeat.innerText = val.innerText;
                selectedSeats.appendChild(selectedSeat);
                seats += 1;
            }
        }

        totalAmount = seats * ticketPrice;
        totalPrice.textContent = '$ ' + totalAmount;
        numberOfSeat.textContent = seats;
    });
});

function removeSelectedSeat(seatno) {
    const removeSelectedSeatElements = document.querySelectorAll('.selectedSeat');
    removeSelectedSeatElements.forEach((val) => {
        if (val.textContent == seatno) {
            val.remove();
        }
    })

    if (document.querySelectorAll('.selectedSeat').length === 0) {
        const noSelected = document.createElement('span');
        noSelected.classList.add('noSelected');
        noSelected.innerText = 'No Seat Selected';
        selectedSeats.appendChild(noSelected);
    }
}

//Add eventLsiter to continue Button

const continueBtn = document.getElementById('proceedBtn');
continueBtn.addEventListener('click', () => {
    let selected = document.querySelectorAll('.row .selected');
    selected.forEach((val) => {
        val.classList.add('occupied');
        val.classList.remove('selected');
        removeSelectedSeat(val.innerText);
    });
    if (selected.length > 0) {
        alert('Yayy! Your seats has been booked');
    }

    seats = 0;
    totalAmount = seats * ticketPrice;
    totalPrice.textContent = '$ ' + totalAmount;
    numberOfSeat.textContent = seats;

});

//Add eventListerner to Cancel Button

const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', () => {
    let selected = document.querySelectorAll('.row .selected');
    selected.forEach((val) => {
        val.classList.remove('selected');
        removeSelectedSeat(val.innerText);
    });

    seats = 0;
    totalAmount = seats * ticketPrice;
    totalPrice.textContent = '$ ' + totalAmount;
    numberOfSeat.textContent = seats;

});

