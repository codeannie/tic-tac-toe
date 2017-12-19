import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  constructor(props) {
      //board has state stored so squares rerender automatically whenever state changes
    super(props);
    this.state = {
      //set initial state to contain array of 9 nulls to correspond to 9 squares
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    //use slice to copy squares array prior to making changes 
    const squares = this.state.squares.slice();
    // ignore click if someone has won the game or if square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      squares: squares,
      // flip the value of isNext when it's clicked so x & o can take turns
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return ( 
      <Square 
        value={this.state.squares[i]}
        // Board passes onClick={() => this.handeClick(i)} to square so when called,
        // it runs this.handleCLick(i) on the board
        onClick={() => this.handleClick(i)} 
        />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
        status = 'Next Player: ' + (this.state.xIsNext ? 'x' : 'o');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// determine when the game is won - helper function
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}