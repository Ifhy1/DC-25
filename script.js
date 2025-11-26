// Balloon data with messages
const balloons = [
  {
      color: '#ff69b4',
      emoji: '💕',
      message: 'May your love grow stronger every day'
  },
  {
      color: '#ff1493',
      emoji: '💖',
      message: 'May you dance through life hand in hand, hearts intertwined'
  },
  {
      color: '#ff85c1',
      emoji: '💗',
      message: 'Here\'s to a lifetime of adventures together'
  },
  {
      color: '#ff6b9d',
      emoji: '💓',
      message: 'May you always find home in each other <br and be the kind of love story that never ends'
  },
  {
      color: '#ffc0cb',
      emoji: '💝',
      message: 'To love, happiness, and forever'
  }
];

let releasedCount = 0;

// Initialize balloons
function initBalloons() {
  const container = document.getElementById('balloonContainer');
  
  balloons.forEach((balloon, index) => {
      const balloonElement = createBalloon(balloon, index);
      container.appendChild(balloonElement);
  });
}

// Create balloon element
function createBalloon(balloon, index) {
  const balloonDiv = document.createElement('div');
  balloonDiv.className = 'balloon';
  balloonDiv.innerHTML = `
      <div class="balloon-body" style="background: ${balloon.color};">
          <span class="balloon-text">${balloon.emoji}</span>
      </div>
      <div class="balloon-string"></div>
      <div class="balloon-message">${balloon.message}</div>
  `;
  
  // Add click event
  balloonDiv.addEventListener('click', () => releaseBalloon(balloonDiv, balloon));
  
  return balloonDiv;
}

// Release balloon animation
function releaseBalloon(balloonElement, balloon) {
  if (balloonElement.classList.contains('flying')) return;
  
  // Add flying animation
  balloonElement.classList.add('flying');
  
  // Create confetti
  createConfetti(balloonElement, balloon.color);
  
  // Increment released count
  releasedCount++;
  
  // Check if all balloons are released
  if (releasedCount === balloons.length) {
      setTimeout(showFinalMessage, 2000);
  }
}

// Create confetti effect
function createConfetti(balloonElement, color) {
  const container = document.getElementById('confettiContainer');
  const rect = balloonElement.getBoundingClientRect();
  const colors = [color, '#ffd700', '#ff69b4', '#87ceeb', '#98fb98'];
  
  for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = rect.left + rect.width / 2 + 'px';
      confetti.style.top = rect.top + 'px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.3 + 's';
      confetti.style.transform = `translateX(${(Math.random() - 0.5) * 100}px)`;
      
      container.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => confetti.remove(), 3000);
  }
}

// Show final message
function showFinalMessage() {
  const finalMessage = document.getElementById('finalMessage');
  finalMessage.classList.add('show');
  
  // Create celebration confetti
  createCelebrationConfetti();
}

// Create celebration confetti
function createCelebrationConfetti() {
  const container = document.getElementById('confettiContainer');
  const colors = ['#ff69b4', '#ffd700', '#ff1493', '#87ceeb', '#98fb98', '#ffb6c1'];
  
  for (let i = 0; i < 100; i++) {
      setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * window.innerWidth + 'px';
          confetti.style.top = '-20px';
          confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.animationDelay = '0s';
          
          container.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initBalloons);