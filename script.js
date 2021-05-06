const BOARD_WIDTH = 8;
const BOARD_HEIGHT = 8;

const WHITE = 0;
const BLACK = 1;

const EMPTY = -1;
const PAWN = 0;
const KNIGHT = 1;
const BISHOP = 2;
const ROOK = 3;
const QUEEN = 4;
const KING = 5;


const INVALID = 0;
const VALID = 1;
const VALID_CAPTURE = 2;

const piecesCharacters = {
    0: 'Pawn.png',
    1: 'Knight.png',
    2: 'Bishop.png',
    3: 'Rook.png',
    4: 'Queen.png',
    5: 'King.png'
};
let chessBox;
let chessCtx;
let currentTeamText;
let whiteCasualitiesText;
let blackCasualitiesText;
let totalVictoriesText;

let board;
let currentTeam;

let curX;
let curY;

let whiteCasualities;
let blackCasualities;

let whiteVictories;
let blackVictories;
document.addEventListener("DOMContentLoaded",onLoad);

function onLoad()
{
     chessBox=document.querySelectorAll('.piece-box');
    console.log(chessBox);
    for(let i=0;i<chessBox.length;i++)
    {
     chessBox[i].addEventListener('click',onClick);
    }
    whiteVictories = 0;
    blackVictories = 0;

    startGame();
}
function startGame()
{
    board = new Board();
    curX = -1;
    curY = -1;
     console.log(board);
    currentTeam = WHITE;
   // currentTeamText.textContent = "White's turn";

    whiteCasualities = [0, 0, 0, 0, 0];
    blackCasualities = [0, 0, 0, 0, 0];
    repaintBoard();
}
function repaintBoard()
{
  //  drawBoard();
  //  checkPossiblePlays();
    drawPieces();
}
function drawPieces() {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
        for (let j = 0; j < BOARD_WIDTH; j++) {
            let pieceType
            if (board.tiles[i][j].team === EMPTY) continue;

            if (board.tiles[i][j].team === WHITE) {
                pieceType = './img/White' +piecesCharacters[board.tiles[i][j].pieceType];
            } else {
                pieceType = './img/Black' + piecesCharacters[board.tiles[i][j].pieceType];
            }
           console.log(i,j);
            const classes=i.toString()+j.toString()
        console.log(pieceType);
          const piece=document.getElementsByClassName(classes);
          console.log(piece[0]);
            let pieceImg = document.createElement("IMG");
            pieceImg.setAttribute('src',pieceType);
            pieceImg.setAttribute('class','piece')
           piece[0].appendChild(pieceImg)
        
           
        }
    }
}
function onClick()
{
   console.log(this);
    this.style.backgroundColor='red'
}
class Board {
    constructor() {
        this.tiles = [];

        this.tiles.push([
            new Tile(ROOK, BLACK),
            new Tile(KNIGHT, BLACK),
            new Tile(BISHOP, BLACK),
            new Tile(QUEEN, BLACK),
            new Tile(KING, BLACK),
            new Tile(BISHOP, BLACK),
            new Tile(KNIGHT, BLACK),
            new Tile(ROOK, BLACK)
        ]);

        this.tiles.push([
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK)
        ]);

        for (let i = 0; i < 4; i++) {
            this.tiles.push([
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
            ]);
        }

        this.tiles.push([
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE)
        ]);

        this.tiles.push([
            new Tile(ROOK, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(QUEEN, WHITE),
            new Tile(KING, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(ROOK, WHITE)
        ]);

        this.validMoves = [];
        for (let i = 0; i < BOARD_HEIGHT; i++) {
            this.validMoves.push([
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID
            ]);
        }
    }

    resetValidMoves() {
        for (let i = 0; i < BOARD_HEIGHT; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                this.validMoves[i][j] = INVALID;
            }
        }
    }
}

class Tile {
    constructor(pieceType, team) {
        this.pieceType = pieceType;
        this.team = team;
    }
}