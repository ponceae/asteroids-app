const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const stars = []

function generateStars(stars)
{
  for (let i = 0; i < 100; i++)
  {
    const randX = Math.random() * canvas.width;
    const randY = Math.random() * canvas.height;

    stars.push({ x: randX, y: randY });
  }
}

function gameLoop() 
{
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update()
{

}

function draw()
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';

  for (const star of stars)
  {
    ctx.fillRect(star.x, star.y, 1, 1);
  }
}

generateStars(stars);

gameLoop();
