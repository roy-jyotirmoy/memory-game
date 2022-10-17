const cardArray = [
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
];

cardArray.sort(() => 0.5 - Math.random()); //sorts the array randomly

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.png');
    card.setAttribute('data-id', i);
    card.addEventListener('click', flipCard); //identifies when we click the card and callbacks flipcard
    gridDisplay.appendChild(card); //adds the card image tags inside the main div element
  }
}
createBoard(); //calling this function to create the board

function checkMatch() {
  const cards = document.querySelectorAll('#grid img'); //gets all the images tag inside the grid element
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];
  if (optionOneId == optionTwoId) {
    //check if same card has been clicked twice
    cardsChosen[0] = [];
    cardsChosen[1] = [];
    cards[optionOneId].setAttribute('src', 'images/blank.png');
    cards[optionTwoId].setAttribute('src', 'images/blank.png');
    alert('You have clicked the same card!');
  } else if (cardsChosen[0] == cardsChosen[1]) {
    //check if cards clicked are a match or not
    alert('You have found a match!');
    cards[optionOneId].setAttribute('src', 'images/white.png'); // on matching cards we set both
    cards[optionTwoId].setAttribute('src', 'images/white.png'); // the card images to white.
    cards[optionOneId].removeEventListener('click', flipCard); //removes the ability to click
    cards[optionTwoId].removeEventListener('click', flipCard); //on the matched cards.
    cardsWon.push(cardsChosen); //this array stores another array(cardsChosen) containing pairs of matching cards
  } else {
    //if there isn't a match change the card images back to blank images
    cards[optionOneId].setAttribute('src', 'images/blank.png');
    cards[optionTwoId].setAttribute('src', 'images/blank.png');
    alert('Sorry, not a match! Try again!');
  }
  resultDisplay.textContent = cardsWon.length;
  cardsChosen = []; //we reset all over again
  cardsChosenIds = []; //we reset all over again
  if (cardsWon.length == cardArray.length / 2) {
    resultDisplay.textContent = 'Congratulations, you found them all!';
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id'); //gets the data-id of the card we clicked
  cardsChosen.push(cardArray[cardId].name); //we get the card name we clicked and push it in another array
  cardsChosenIds.push(cardId); //we get the card id and push it another array as well
  this.setAttribute('src', cardArray[cardId].img); //will flip the image and change it to the image of the card we actually clicked
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 90); //will call function checkMatch after 90ms have passed
  }
}
