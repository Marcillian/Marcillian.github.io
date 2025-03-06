<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kyian Kambe - A Paragon of Ingenuity</title>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

  <style>
    /* ... your existing CSS ... */

    #gameContainer {
      /* Add styles for the game container if needed */
      margin: 20px 0;
      /* Example: Add some margin around the game */
    }

    canvas {
      background-color: #283655;
      /* Mystical background color */
      border: 2px solid #8E7DBE;
      /* Mystical border color */
    }
  </style>
</head>

<body>
  <header>
    </header>

  <main>
    <section id="hero" class="hero" data-aos="fade-up">
      </section>

    <section id="about" data-aos="fade-up">
      <h2>About Me - An Inquisitive Mind Forged in Academia</h2>
      <p>
        I am Kyian Kambe, a perspicacious and highly motivated student currently pursuing a first-class degree in
        Politics and International Relations at the esteemed University of York. My academic pursuits, culminating in
        the
        successful completion of the rigorous International Baccalaureate Diploma with a specialization in Philosophy,
        English Literature, and Geography, have instilled in me an insatiable curiosity for knowledge and an
        unparalleled
        capacity for critical analysis.
      </p>
      <p>
        Driven by an unwavering passion for the intricacies of jurisprudence and a profound fascination with the
        complexities of the financial domain, I am poised to embark on a remarkable career in one of these dynamic
        fields. My diverse experiences, spanning from erudite academic research and philosophical investigations to
        pragmatic engagements in logistics and client support, have equipped me with an exceptional repertoire of
        skills
        and an unyielding determination to excel in intellectually stimulating environments. I am confident in my
        ability
        to contribute meaningfully to any team and to make a lasting impact on the world.
      </p>

      <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
      </div>

    </section>

    </main>

  <footer>
    <p class="footer-bottom">&copy; 20XX Kyian Kambe. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <script>
    AOS.init();

    // Game Variables
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const gridSize = 20; // Size of each grid cell
    let dragon = [{ x: 10, y: 10 }]; // Dragon's initial position (snake-like body)
    let direction = "right"; // Initial movement direction
    let knight = { x: 50, y: 30 }; // Knight's initial position
    let powerUps =; // Array to store power-up positions
    let score = 0; // Player score
    let gameLoop; // Variable to hold the game loop interval

    // Function to generate a random power-up
    function generatePowerUp() {
      let x, y;
      do {
        x = Math.floor(Math.random() * (canvas.width / gridSize));
        y = Math.floor(Math.random() * (canvas.height / gridSize));
      } while (
        dragon.some(segment => segment.x === x && segment.y === y) ||
        (knight.x === x && knight.y === y)
      );
      powerUps.push({ x, y });
    }

    // Function to draw game elements
    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dragon
      dragon.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "lime"; // Head is green, body is lime
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });

      // Draw knight
      ctx.fillStyle = "red";
      ctx.fillRect(knight.x * gridSize, knight.y * gridSize, gridSize, gridSize);

      // Draw power-ups
      powerUps.forEach((powerUp) => {
        ctx.fillStyle = "yellow";
        ctx.fillRect(powerUp.x * gridSize, powerUp.y * gridSize, gridSize, gridSize);
      });

      // Draw score
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 30);
    }

    // Function to update game logic
    function update() {
      // Move dragon
      const head = { ...dragon[0] };
      if (direction === "right") head.x++;
      if (direction === "left") head.x--;
      if (direction === "up") head.y--;
      if (direction === "down") head.y++;

      // Check for wall collisions
      if (
        head.x < 0 ||
        head.x >= canvas.width / gridSize ||
        head.y < 0 ||
        head.y >= canvas.height / gridSize ||
        dragon.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
      ) {
        gameOver();
        return;
      }

      dragon.unshift(head); // Add new head

      // Check for collisions with knight
      if (head.x === knight.x && head.y === knight.y) {
        gameOver();
        return;
      }

      // Check for power-up collection
      powerUps.forEach((powerUp, index) => {
        if (head.x === powerUp.x && head.y === powerUp.y) {
          powerUps.splice(index, 1);
          score += 10; // Increase score
          generatePowerUp(); // Generate a new power-up
        }
      });

      // Remove tail if no power-up collected (snake-like growth)
      if (powerUps.length === 0) {
        dragon.pop();
      }

      // Move knight (simple chase logic)
      if (knight.x < dragon[0].x) knight.x++;
      if (knight.x > dragon[0].x) knight.x--;
      if (knight.y < dragon[0].y) knight.y++;
      if (knight.y > dragon[0].y) knight.y--;

      draw(); // Redraw game elements
    }

    function gameOver() {
      clearInterval(gameLoop);
      alert("Game Over! Your score: " + score);
    }

    // Game Loop
    function startGame() {
      generatePowerUp(); // Generate initial power-up
      gameLoop = setInterval(update, 100); // Update every 100ms
    }

    // Event listener for arrow keys (dragon movement)
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" && direction !== "left") direction = "right";
      if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
      if (event.key === "ArrowUp" && direction !== "down") direction = "up";
      if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    });

    startGame(); // Start the game
  </script>
</body>

</html>
