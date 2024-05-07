    document.addEventListener('DOMContentLoaded', () => {
        const board = document.getElementById('game-board');
        const scoreElement = document.getElementById('score-value');
        const boardSize = 18.5;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let direction = 'right';
        let score = 0;
        let snakeSpeed = 100;
        let gameInterval;

        function drawSnake() {
        board.innerHTML = '';
        snake.forEach((segment, index) => {
            const snakeElement = document.createElement('div');
            snakeElement.style.left = segment.x * 20 + 'px';
            snakeElement.style.top = segment.y * 20 + 'px';
            snakeElement.classList.add('snake');
            if (index === 0) {
            snakeElement.classList.add('snake-head');
            }
            board.appendChild(snakeElement);
        });
        }

        function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.style.left = food.x * 20 + 'px';
        foodElement.style.top = food.y * 20 + 'px';
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        }

        function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
            head.y -= 1;
            break;
            case 'down':
            head.y += 1;
            break;
            case 'left':
            head.x -= 1;
            break;
            case 'right':
            head.x += 1;
            break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
        }

        function generateFood() {
        let foodX, foodY;
        do {
            foodX = Math.floor(Math.random() * boardSize) + 1;
            foodY = Math.floor(Math.random() * boardSize) + 1;
        } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
        food = { x: foodX, y: foodY };
        }

        function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
            case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
            case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
            case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        }
        }

        function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over! Your score: ' + score);
        }

        function checkCollision() {
        const head = snake[0];
        if (
            head.x < 1 || head.x > boardSize ||
            head.y < 1 || head.y > boardSize ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            gameOver();
        }
        }

        document.addEventListener('keydown', changeDirection);

        function startGame() {
        gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            drawSnake();
            drawFood();
        }, snakeSpeed);
        }

        function pauseGame() {
        clearInterval(gameInterval);
        }

        function resetGame() {
        clearInterval(gameInterval);
        snake = [{ x: 10, y: 10 }];
        direction = 'right';
        score = 0;
        scoreElement.textContent = score;
        generateFood();
        drawSnake();
        drawFood();
        }

        function changeSpeed(speed) {
        snakeSpeed = speed;
        clearInterval(gameInterval);
        startGame();
        }

        document.getElementById('play').addEventListener('click', startGame);
        document.getElementById('pause').addEventListener('click', pauseGame);
        document.getElementById('reset').addEventListener('click', resetGame);
        document.querySelectorAll('.speed-option').forEach(option => {
        option.addEventListener('click', () => {
            changeSpeed(parseInt(option.dataset.speed));
        });
        });

        generateFood();
        drawSnake();
    });
