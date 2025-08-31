class OthelloGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 1; // 1: 黒, 2: 白
        this.gameOver = false;
        this.passCount = 0;
        
        this.initializeBoard();
        this.setupEventListeners();
        this.renderBoard();
        this.updateScore();
        this.updateTurnIndicator();
    }
    
    initializeBoard() {
        // 8x8の盤面を初期化（0: 空, 1: 黒, 2: 白）
        this.board = Array(8).fill().map(() => Array(8).fill(0));
        
        // 初期配置: D4とE5に白、D5とE4に黒
        this.board[3][3] = 2; // D4 (白)
        this.board[4][4] = 2; // E5 (白)
        this.board[3][4] = 1; // D5 (黒)
        this.board[4][3] = 1; // E4 (黒)
        
        this.currentPlayer = 1; // 黒が先手
        this.gameOver = false;
        this.passCount = 0;
    }
    
    setupEventListeners() {
        document.getElementById('reset-button').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('pass-button').addEventListener('click', () => {
            this.passMove();
        });
        
        document.getElementById('new-game-button').addEventListener('click', () => {
            this.resetGame();
            this.hideGameOverModal();
        });
    }
    
    renderBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                // 駒がある場合は表示
                if (this.board[row][col] !== 0) {
                    const piece = document.createElement('div');
                    piece.className = `cell-piece ${this.board[row][col] === 1 ? 'black' : 'white'}`;
                    cell.appendChild(piece);
                }
                
                // 有効な手の場合はハイライト
                if (!this.gameOver && this.isValidMove(row, col, this.currentPlayer)) {
                    cell.classList.add('valid-move');
                }
                
                // クリックイベント
                cell.addEventListener('click', () => {
                    this.makeMove(row, col);
                });
                
                boardElement.appendChild(cell);
            }
        }
    }
    
    isValidMove(row, col, player) {
        if (this.board[row][col] !== 0) return false;
        
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        
        for (const [dx, dy] of directions) {
            if (this.checkDirection(row, col, dx, dy, player)) {
                return true;
            }
        }
        
        return false;
    }
    
    checkDirection(row, col, dx, dy, player) {
        const opponent = player === 1 ? 2 : 1;
        let x = row + dx;
        let y = col + dy;
        let hasOpponentPiece = false;
        
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (this.board[x][y] === opponent) {
                hasOpponentPiece = true;
            } else if (this.board[x][y] === player && hasOpponentPiece) {
                return true;
            } else {
                break;
            }
            x += dx;
            y += dy;
        }
        
        return false;
    }
    
    makeMove(row, col) {
        if (this.gameOver || !this.isValidMove(row, col, this.currentPlayer)) {
            return;
        }
        
        this.board[row][col] = this.currentPlayer;
        this.flipPieces(row, col, this.currentPlayer);
        
        this.passCount = 0; // 有効な手が打たれたのでパスカウントをリセット
        this.switchPlayer();
        
        this.renderBoard();
        this.updateScore();
        this.updateTurnIndicator();
        
        // 次のプレイヤーが打てる手があるかチェック
        if (!this.hasValidMoves(this.currentPlayer)) {
            this.passMove();
        }
    }
    
    flipPieces(row, col, player) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        
        for (const [dx, dy] of directions) {
            if (this.checkDirection(row, col, dx, dy, player)) {
                this.flipInDirection(row, col, dx, dy, player);
            }
        }
    }
    
    flipInDirection(row, col, dx, dy, player) {
        const opponent = player === 1 ? 2 : 1;
        let x = row + dx;
        let y = col + dy;
        const toFlip = [];
        
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (this.board[x][y] === opponent) {
                toFlip.push([x, y]);
            } else if (this.board[x][y] === player) {
                // 挟んだ駒をひっくり返す
                for (const [fx, fy] of toFlip) {
                    this.board[fx][fy] = player;
                }
                break;
            } else {
                break;
            }
            x += dx;
            y += dy;
        }
    }
    
    hasValidMoves(player) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.isValidMove(row, col, player)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
    
    passMove() {
        if (this.gameOver) return;
        
        this.passCount++;
        this.showMessage(`${this.currentPlayer === 1 ? '黒' : '白'}がパスしました`);
        
        if (this.passCount >= 2) {
            // 両プレイヤーがパスした場合、ゲーム終了
            this.endGame();
            return;
        }
        
        this.switchPlayer();
        this.updateTurnIndicator();
        
        // 次のプレイヤーも打てる手がない場合は自動的にパス
        if (!this.hasValidMoves(this.currentPlayer)) {
            setTimeout(() => this.passMove(), 1000);
        } else {
            this.renderBoard();
        }
    }
    
    updateScore() {
        let blackCount = 0;
        let whiteCount = 0;
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col] === 1) blackCount++;
                else if (this.board[row][col] === 2) whiteCount++;
            }
        }
        
        document.getElementById('black-score').textContent = blackCount;
        document.getElementById('white-score').textContent = whiteCount;
        
        // 盤面が埋まった場合はゲーム終了
        if (blackCount + whiteCount === 64) {
            this.endGame();
        }
    }
    
    updateTurnIndicator() {
        const indicator = document.getElementById('turn-indicator');
        indicator.textContent = `${this.currentPlayer === 1 ? '黒' : '白'}のターン`;
    }
    
    showMessage(message) {
        const messageElement = document.getElementById('game-message');
        messageElement.textContent = message;
        setTimeout(() => {
            messageElement.textContent = '';
        }, 2500); // メッセージ表示時間を短縮
    }
    
    endGame() {
        this.gameOver = true;
        
        const blackScore = parseInt(document.getElementById('black-score').textContent);
        const whiteScore = parseInt(document.getElementById('white-score').textContent);
        
        let winner;
        if (blackScore > whiteScore) {
            winner = '黒の勝利！';
        } else if (whiteScore > blackScore) {
            winner = '白の勝利！';
        } else {
            winner = '引き分け！';
        }
        
        document.getElementById('winner-message').textContent = winner;
        document.getElementById('final-score').textContent = `最終スコア - 黒: ${blackScore}, 白: ${whiteScore}`;
        
        this.showGameOverModal();
    }
    
    showGameOverModal() {
        document.getElementById('game-over-modal').classList.remove('hidden');
    }
    
    hideGameOverModal() {
        document.getElementById('game-over-modal').classList.add('hidden');
    }
    
    resetGame() {
        this.initializeBoard();
        this.renderBoard();
        this.updateScore();
        this.updateTurnIndicator();
        this.showMessage('ゲームをリセットしました');
    }
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    new OthelloGame();
});