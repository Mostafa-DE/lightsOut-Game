import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
    static defaultProps = {
      nrows: 5,
      ncols: 5,
      chanceLightStartsOn: 0.25

    }

  constructor(props) {
    super(props);
    this.state = {
      haswon: false,
      board: this.createBoard()
    }
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0 ; y < this.props.nrows ; y++ ) {
      let row = [];
      for (let x = 0 ; x < this.props.ncols ; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);

    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    // console.log('Fliping')
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y , x); // flip initial cell
    flipCell(y , x - 1); // flip left
    flipCell(y , x + 1); // flip right 
    flipCell(y - 1 , x); // flip below
    flipCell(y + 1 , x); // flip above


    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.haswon) {
      return (
      <div class="board-title">
        <div className='winner'>
          <span class="text-lights">YOU </span>
          <span class="text-out">WIN !! </span>
        </div>

      </div>  
      )
    }

    let tableBoard = [];
    for(let y = 0 ; y < this.props.nrows ; y++ ) {
        let row = [];
      for(let x = 0 ; x < this.props.ncols ; x++) {
        let coord = `${y}-${x}`;
         row.push(<Cell key={coord}  
                        isLit={this.state.board[y][x]} 
                        flipCellsAroundMe={ () => this.flipCellsAround(coord)} />
                  )   
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }

    return (
    <div>
      
      <div className="board-title">
        <div className="text-lights">Lights </div>
        <div className="text-out">Out </div>
      </div>  

      <table className='Board'>
        <tbody>
              {tableBoard}
        </tbody>
      </table>
    </div>
      

    );

  }
}


export default Board;
