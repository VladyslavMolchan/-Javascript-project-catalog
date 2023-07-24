document.addEventListener("DOMContentLoaded", function () {
    const year = document.querySelector('#year');
    const days = document.querySelector('#days');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const countdown = document.querySelector('#countdown');
    const preloader = document.querySelector('#preloader');
    const backButton = document.querySelector('.double-border-link');
  
    const currentYear = new Date().getFullYear();
    const nextYear = new Date(`August 04 ${currentYear} 00:00:00`);
  
    function updateCounter() {
      const currentDate = new Date();
      const diff = nextYear - currentDate;
      const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);
      const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;
      const minutesLeft = Math.floor(diff / 1000 / 60) % 60;
      const secondsLeft = Math.floor(diff / 1000) % 60;
  
      // Дата моего рождения
      const birthDate = new Date('1990-08-04');
  
      // Вычисляем разницу в миллисекундах между текущей датой и датой рождения
      const timeDiff = currentDate.getTime() - birthDate.getTime();
  
      // Количество миллисекунд в году (приблизительно)
      const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
  
      // Вычисляем возраст
      const age = Math.floor(timeDiff / millisecondsPerYear);
  
      year.innerText = age;
  
      days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft;
      hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
      minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
      seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    }
  
    setInterval(updateCounter, 1000);
  
    // Скрыть "Back" кнопку изначально во время работы прелоадера
    backButton.style.display = 'none';
  
    setTimeout(function () {
      preloader.remove();
      countdown.style.display = 'flex';
      // Показать "Back" кнопку после окончания прелоадера
      backButton.style.display = 'inline-block';
    }, 1000);
  });
  