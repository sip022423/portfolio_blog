function hamburg() {
    document.querySelector('.dropdown').style.display = 'block';
  }
  
  function cancel() {
    document.querySelector('.dropdown').style.display = 'none';
  }
  
  // Hide mobile dropdown on nav link click
  document.querySelectorAll('.dropdown .links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.dropdown').style.display = 'none';
    });
  });
  
  // Smooth scroll (optional for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });

  });
  document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
  
    boxes.forEach(box => {
      const percent = parseInt(box.getAttribute("data-percent"));
      const number = box.querySelector(".number");
      const circular = box.querySelector(".circular");
  
      let current = 0;
  
      const interval = setInterval(() => {
        if (current <= percent) {
          number.textContent = `${current}%`;
          circular.style.background = `conic-gradient(orangered ${current * 3.6}deg, #333 ${current * 3.6}deg)`;
          current++;
        } else {
          clearInterval(interval);
        }
      }, 15); // speed of count
    });
  });
  


