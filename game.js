// Массив иконок Font Awesome, который используется для создания карточек (можно модифицировать).
const icons = [
	'icons/bti.svg',
  'icons/btc.svg',
  'icons/btb.svg',
  'icons/bto.svg',
  'icons/cifr.svg',
  'icons/cos.svg',
  'icons/lider.svg',
  'icons/mig.svg',
  'icons/obob.svg',
  'icons/ou.svg',
  'icons/shur.svg',
  'icons/smile.svg'
];

// Функция, которая дублирует элементы массива и сортирует их.
// Это нужно для создания парных карточек (две одинаковые карточки для каждой иконки).
const duplicate = (arr) => {
	return arr.concat(arr).sort();
};

// Функция для проверки совпадения двух открытых карточек.
// Если иконки одинаковые — это пара (совпадение).
const checkMatch = (icons) => {
	if (icons[0] === icons[1]) {
  	console.log("it's a match"); // Выводим сообщение в консоль, если карточки совпали.
  	return true; // Возвращаем true, если карточки совпали.
  }
  return false; // Возвращаем false, если карточки не совпали.
};

// Создаем новый объект Vue — это фреймворк, который управляет поведением интерфейса.
new Vue({
  el: "#app",
  data: {
    cards: _.range(0, icons.length * 2),
    running: false,
    startTime: null,
    elapsedTime: 0,
    movesCount: 0
  },
  methods: {
    cardsShuffle() {
      this.startTime = Date.now();
      this.elapsedTime = 0;
      this.movesCount = 0;
      
      this.cards.forEach((card, index) => {
        this.cards[index] = { icon: '', down: true, matched: false };
      });
      icons.forEach((icon, index) => {
        this.cards[index].icon = icon;
        this.cards[index + icons.length].icon = icon;
      });
      this.cards = _.shuffle(this.cards);
    },
    handleClick(cardClicked) {
      if (!this.running && !cardClicked.matched && this.cardCount.cardsUp < 2) {
        this.movesCount++;
        cardClicked.down = false;

        if (this.cardCount.cardsUp === 2) {
          this.running = true;
          setTimeout(() => {
            let match = checkMatch(this.cardCount.icons);
            this.cards.forEach((card) => {
              if (match && !card.down && !card.matched) {
                card.matched = true;
              } else {
                card.down = true;
              }
            });
            this.running = false;
          }, 1500);
        }
      }
    },
    restartGame() {
      this.cardsShuffle();
    }
  },
  mounted() {
    this.cardsShuffle();
  },
  computed: {
    cardCount() {
      let cardUpCount = 0;
      let cardMatchedCount = 0;
      let icons = [];
      this.cards.forEach((card) => {
        if (!card.down && !card.matched) {
          cardUpCount++;
          icons.push(card.icon);
        }
        if (card.matched) {
          cardMatchedCount++;
        }
      });
      return { cardsUp: cardUpCount, cardsMatched: cardMatchedCount, icons: icons };
    },
    victory() {
      if (this.cardCount.cardsMatched === this.cards.length) {
        this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(1);
        return true;
      }
      return false;
    }
  }
});

