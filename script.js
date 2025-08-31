class OthelloGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 1; // 1: 黒, 2: 白
        this.gameOver = false;
        this.passCount = 0;
        this.gameMode = 'pvp'; // 'pvp' or 'pvc'
        this.aiDifficulty = 'medium';
        this.aiPlayer = 2; // AIは白
        this.isAiThinking = false;
        this.soundEnabled = true;
        this.audioContext = null;
        this.isDarkTheme = false;
        this.gameStartTime = null;
        this.stats = {
            totalGames: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            totalTime: 0
        };
        
        this.initializeAudio();
        this.initializeTheme();
        this.loadStats();
        this.initializeBoard();
        this.setupEventListeners();
        this.renderBoard();
        this.updateScore();
        this.updateTurnIndicator();
        this.gameStartTime = Date.now();
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
        
        document.getElementById('hint-button').addEventListener('click', () => {
            this.showHint();
        });
        
        document.getElementById('new-game-button').addEventListener('click', () => {
            this.resetGame();
            this.hideGameOverModal();
        });
        
        // ゲームモード切り替え
        document.getElementById('pvp-mode').addEventListener('click', () => {
            this.setGameMode('pvp');
        });
        
        document.getElementById('pvc-mode').addEventListener('click', () => {
            this.setGameMode('pvc');
        });
        
        // AI難易度変更
        document.getElementById('difficulty-select').addEventListener('change', (e) => {
            this.aiDifficulty = e.target.value;
        });
        
        // 音効果切り替え
        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.toggleSound();
        });
        
        // テーマ切り替え
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // 統計表示
        document.getElementById('stats-toggle').addEventListener('click', () => {
            this.showStats();
        });
        
        // 統計モーダル閉じる
        document.getElementById('close-stats').addEventListener('click', () => {
            this.hideStats();
        });
        
        // 統計リセット
        document.getElementById('reset-stats').addEventListener('click', () => {
            this.resetStats();
        });
        
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
    }
    
    // 音声初期化
    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
            this.soundEnabled = false;
        }
    }
    
    // 音効果切り替え
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const button = document.getElementById('sound-toggle');
        if (this.soundEnabled) {
            button.textContent = '🔊';
            button.classList.remove('muted');
        } else {
            button.textContent = '🔇';
            button.classList.add('muted');
        }
    }
    
    // 音効果再生
    playSound(type) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        switch (type) {
            case 'place':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
                
            case 'flip':
                oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.05);
                break;
                
            case 'win':
                oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
                oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.2);
                oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.4);
                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.6);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.6);
                break;
         }
      }
      
      // 統計機能
      loadStats() {
          const savedStats = localStorage.getItem('othelloStats');
          if (savedStats) {
              this.stats = JSON.parse(savedStats);
          }
      }
      
      saveStats() {
          localStorage.setItem('othelloStats', JSON.stringify(this.stats));
      }
      
      updateStats(result) {
          this.stats.totalGames++;
          
          const gameTime = Date.now() - this.gameStartTime;
          this.stats.totalTime += gameTime;
          
          if (result === 'win') {
              this.stats.wins++;
          } else if (result === 'loss') {
              this.stats.losses++;
          } else {
              this.stats.draws++;
          }
          
          this.saveStats();
      }
      
      showStats() {
          this.loadStats();
          
          document.getElementById('total-games').textContent = this.stats.totalGames;
          document.getElementById('wins').textContent = this.stats.wins;
          document.getElementById('losses').textContent = this.stats.losses;
          document.getElementById('draws').textContent = this.stats.draws;
          
          const winRate = this.stats.totalGames > 0 ? 
              Math.round((this.stats.wins / this.stats.totalGames) * 100) : 0;
          document.getElementById('win-rate').textContent = winRate + '%';
          
          const avgTime = this.stats.totalGames > 0 ? 
              Math.round(this.stats.totalTime / this.stats.totalGames / 1000) : 0;
          document.getElementById('avg-time').textContent = avgTime + '秒';
          
          document.getElementById('stats-modal').style.display = 'flex';
      }
      
      hideStats() {
          document.getElementById('stats-modal').style.display = 'none';
      }
      
      resetStats() {
          if (confirm('統計をリセットしますか？')) {
              this.stats = {
                  totalGames: 0,
                  wins: 0,
                  losses: 0,
                  draws: 0,
                  totalTime: 0
              };
              this.saveStats();
              this.showStats();
          }
      }
      
      // テーマ切り替え
     toggleTheme() {
         this.isDarkTheme = !this.isDarkTheme;
         const body = document.body;
         const button = document.getElementById('theme-toggle');
         
         if (this.isDarkTheme) {
             body.classList.add('dark-theme');
             button.textContent = '☀️';
         } else {
             body.classList.remove('dark-theme');
             button.textContent = '🌙';
         }
         
         // ローカルストレージに保存
         localStorage.setItem('darkTheme', this.isDarkTheme);
     }
     
     // テーマ初期化
     initializeTheme() {
         const savedTheme = localStorage.getItem('darkTheme');
         if (savedTheme === 'true') {
             this.isDarkTheme = true;
             document.body.classList.add('dark-theme');
             document.getElementById('theme-toggle').textContent = '☀️';
         }
     }
      
      // キーボードナビゲーション
      handleKeyboardInput(e) {
          // ESCキーでモーダルを閉じる
          if (e.key === 'Escape') {
              this.hideGameOverModal();
              this.hideStats();
              return;
          }
          
          // スペースキーでヒント表示
          if (e.key === ' ' || e.key === 'Spacebar') {
              e.preventDefault();
              this.showHint();
              return;
          }
          
          // Rキーでリセット
          if (e.key === 'r' || e.key === 'R') {
              this.resetGame();
              return;
          }
          
          // Pキーでパス
          if (e.key === 'p' || e.key === 'P') {
              this.passMove();
              return;
          }
          
          // Sキーで統計表示
          if (e.key === 's' || e.key === 'S') {
              this.showStats();
              return;
          }
          
          // Mキーで音効果切り替え
          if (e.key === 'm' || e.key === 'M') {
              this.toggleSound();
              return;
          }
          
          // Tキーでテーマ切り替え
          if (e.key === 't' || e.key === 'T') {
              this.toggleTheme();
              return;
          }
      }
      
      // メモリリーク防止：イベントリスナークリーンアップ
      cleanup() {
          const boardElement = document.getElementById('game-board');
          if (boardElement) {
              // 既存のイベントリスナーを削除
              const cells = boardElement.querySelectorAll('.cell');
              cells.forEach(cell => {
                  cell.replaceWith(cell.cloneNode(true));
              });
          }
      }
      
      renderBoard() {
          this.cleanup(); // メモリリーク防止
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
                
                cell.tabIndex = 0;
                cell.setAttribute('role', 'button');
                cell.setAttribute('aria-label', `セル ${row + 1}-${col + 1}`);
                
                // クリックイベント
                cell.addEventListener('click', () => {
                    this.makeMove(row, col);
                });
                
                cell.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.makeMove(row, col);
                    }
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
        if (this.gameOver || this.isAiThinking || !this.isValidMove(row, col, this.currentPlayer)) {
            return;
        }
        
        // AI対戦モードで人間のターンでない場合は無視
        if (this.gameMode === 'pvc' && this.currentPlayer === this.aiPlayer) {
            return;
        }
        
        this.board[row][col] = this.currentPlayer;
        
        // 音効果再生
        this.playSound('place');
        
        this.flipPieces(row, col, this.currentPlayer);
        
        this.passCount = 0; // 有効な手が打たれたのでパスカウントをリセット
        this.switchPlayer();
        
        this.renderBoard();
        this.updateScore();
        this.updateTurnIndicator();
        
        // 次のプレイヤーが打てる手があるかチェック
        if (!this.hasValidMoves(this.currentPlayer)) {
            this.passMove();
        } else if (this.gameMode === 'pvc' && this.currentPlayer === this.aiPlayer) {
            // AIのターンの場合
            this.makeAiMove();
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
                // 挟んだ駒をひっくり返す（アニメーション付き）
                toFlip.forEach(([fx, fy], index) => {
                    // パフォーマンス最適化：requestAnimationFrameを使用
                    setTimeout(() => {
                        this.board[fx][fy] = player;
                        const cell = document.querySelector(`[data-row="${fx}"][data-col="${fy}"]`);
                        const piece = cell.querySelector('.cell-piece');
                        if (piece) {
                            piece.classList.add('flipping');
                            this.playSound('flip');
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    piece.className = `cell-piece ${player === 1 ? 'black' : 'white'}`;
                                    setTimeout(() => {
                                        piece.classList.remove('flipping');
                                    }, 100);
                                }, 300);
                            });
                        }
                    }, index * 100); // 順次アニメーション
                });
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
            this.playSound('win');
            // 統計更新（プレイヤーが黒の場合）
            if (this.gameMode === 'pvp' || (this.gameMode === 'pvc' && this.aiPlayer === 2)) {
                this.updateStats('win');
            } else {
                this.updateStats('loss');
            }
        } else if (whiteScore > blackScore) {
            winner = '白の勝利！';
            this.playSound('win');
            // 統計更新（プレイヤーが白の場合）
            if (this.gameMode === 'pvp' || (this.gameMode === 'pvc' && this.aiPlayer === 1)) {
                this.updateStats('win');
            } else {
                this.updateStats('loss');
            }
        } else {
            winner = '引き分け！';
            this.updateStats('draw');
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
        this.gameStartTime = Date.now();
    }
    
    // ゲームモード設定
    setGameMode(mode) {
        this.gameMode = mode;
        
        // UIの更新
        document.querySelectorAll('.mode-button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`${mode}-mode`).classList.add('active');
        
        const aiDifficultyDiv = document.getElementById('ai-difficulty');
        if (mode === 'pvc') {
            aiDifficultyDiv.classList.remove('hidden');
        } else {
            aiDifficultyDiv.classList.add('hidden');
        }
        
        this.resetGame();
        
        if (mode === 'pvc') {
            this.showMessage('AI対戦モードに切り替えました。あなたは黒です。');
        } else {
            this.showMessage('対人戦モードに切り替えました。');
        }
    }
    
    // AI の手を決定
    makeAiMove() {
        if (this.gameOver || this.isAiThinking) return;
        
        this.isAiThinking = true;
        this.showMessage('AIが考えています...');
        
        // AIの思考時間をシミュレート
        setTimeout(() => {
            const bestMove = this.getBestAiMove();
            
            if (bestMove) {
                this.board[bestMove.row][bestMove.col] = this.currentPlayer;
                this.flipPieces(bestMove.row, bestMove.col, this.currentPlayer);
                this.passCount = 0;
                this.switchPlayer();
                
                this.renderBoard();
                this.updateScore();
                this.updateTurnIndicator();
                
                // 次のプレイヤー（人間）が打てる手があるかチェック
                if (!this.hasValidMoves(this.currentPlayer)) {
                    this.passMove();
                }
            } else {
                // AIがパスする場合
                this.passMove();
            }
            
            this.isAiThinking = false;
        }, 1000 + Math.random() * 1000); // 1-2秒の思考時間
    }
    
    // AIの最適手を取得
    getBestAiMove() {
        const validMoves = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.isValidMove(row, col, this.currentPlayer)) {
                    const score = this.evaluateMove(row, col, this.currentPlayer);
                    validMoves.push({ row, col, score });
                }
            }
        }
        
        if (validMoves.length === 0) return null;
        
        // 難易度に応じて手を選択
        switch (this.aiDifficulty) {
            case 'easy':
                // ランダムに選択
                return validMoves[Math.floor(Math.random() * validMoves.length)];
                
            case 'medium':
                // 上位50%からランダム選択
                validMoves.sort((a, b) => b.score - a.score);
                const topHalf = validMoves.slice(0, Math.max(1, Math.floor(validMoves.length / 2)));
                return topHalf[Math.floor(Math.random() * topHalf.length)];
                
            case 'hard':
                // 最高スコアの手を選択
                validMoves.sort((a, b) => b.score - a.score);
                return validMoves[0];
                
            default:
                return validMoves[0];
        }
    }
    
    // 手の評価値を計算
    evaluateMove(row, col, player) {
        // 基本スコア: 取得できる駒数
        let score = this.countFlippedPieces(row, col, player);
        
        // 角の重み付け
        if ((row === 0 || row === 7) && (col === 0 || col === 7)) {
            score += 100; // 角は非常に価値が高い
        }
        
        // 辺の重み付け
        if (row === 0 || row === 7 || col === 0 || col === 7) {
            score += 10;
        }
        
        // 角の隣接マスは避ける
        if (this.isAdjacentToCorner(row, col)) {
            score -= 20;
        }
        
        return score;
    }
    
    // 角に隣接しているかチェック
    isAdjacentToCorner(row, col) {
        const corners = [[0,0], [0,7], [7,0], [7,7]];
        for (const [cr, cc] of corners) {
            if (Math.abs(row - cr) <= 1 && Math.abs(col - cc) <= 1 && !(row === cr && col === cc)) {
                return true;
            }
        }
        return false;
    }
    
    // 反転される駒数をカウント
    countFlippedPieces(row, col, player) {
        if (this.board[row][col] !== 0) return 0;
        
        let count = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        
        for (const [dx, dy] of directions) {
            count += this.countFlippedInDirection(row, col, dx, dy, player);
        }
        
        return count;
    }
    
    // 特定方向で反転される駒数をカウント
    countFlippedInDirection(row, col, dx, dy, player) {
        const opponent = player === 1 ? 2 : 1;
        let x = row + dx;
        let y = col + dy;
        let count = 0;
        
        while (x >= 0 && x < 8 && y >= 0 && y < 8) {
            if (this.board[x][y] === opponent) {
                count++;
            } else if (this.board[x][y] === player && count > 0) {
                return count;
            } else {
                break;
            }
            x += dx;
            y += dy;
        }
        
        return 0;
    }
    
    // ヒント機能
    showHint() {
        if (this.gameOver || (this.gameMode === 'pvc' && this.currentPlayer === this.aiPlayer)) {
            return;
        }
        
        const validMoves = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.isValidMove(row, col, this.currentPlayer)) {
                    const score = this.evaluateMove(row, col, this.currentPlayer);
                    validMoves.push({ row, col, score });
                }
            }
        }
        
        if (validMoves.length === 0) {
            this.showMessage('有効な手がありません');
            return;
        }
        
        // 最高スコアの手を取得
        validMoves.sort((a, b) => b.score - a.score);
        const bestMove = validMoves[0];
        
        // ヒントを表示
        const cell = document.querySelector(`[data-row="${bestMove.row}"][data-col="${bestMove.col}"]`);
        if (cell) {
            cell.classList.add('hint');
            setTimeout(() => {
                cell.classList.remove('hint');
            }, 2000);
        }
        
        this.showMessage(`ヒント: ${String.fromCharCode(65 + bestMove.col)}${bestMove.row + 1} (スコア: ${bestMove.score})`);
    }
}

// ゲーム開始
document.addEventListener('DOMContentLoaded', () => {
    new OthelloGame();
});