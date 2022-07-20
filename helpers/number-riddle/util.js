export const CreateBoard=(gameDim,startGame,testing)=>{
    console.log("creating board")
    if(testing) return [[1,2,3],[4,5,6],[7,0,8]];
    let numArr= new Array(Math.pow(gameDim,2) - 1).fill(0).map((_,i)=> i+1);
    let board=[];
    let currentRow=[];
    let counter=1;
    for(let i=0 ; i < gameDim ; i++){
        currentRow=[];
        for(let j=0 ; j< gameDim ; j++){
            if(i===gameDim-1 && j ===gameDim-1) currentRow.push(0);
            else if(!startGame) currentRow.push(counter++);
            else currentRow.push(numArr.splice(randomInteger(0,numArr.length-1),1)[0]);
        }
        board.push(currentRow);
    }
    if(isSolvable(board)) return board;
    let temp=board[0][0];
    board[0][0]=board[0][1];
    board[0][1]=temp;
    return board;
    
}
export const createCopy=(board)=>{
    return board.map(each=> each.slice());
}
const findPos=(board,num)=>{
    for(let i=0 ; i<board.length ; i++){
        for(let j=0 ; j< board.length ; j++){
            if(board[i][j] === num){
                return [i,j];
            } 
        }
    }
}
export const isSolvable=(board)=>{
    const newBoard=createCopy(board);
    let count=1;
    let inv=0;
    for(let i=0 ; i< newBoard.length ; i++){
        for(let j=0 ; j< newBoard.length ; j++){
                if(newBoard[i][j] !== count && newBoard[i][j] !== 0){
                    const [k,l]=findPos(newBoard,count);
                    newBoard[k][l]=newBoard[i][j];
                    newBoard[i][j]=count;
                    inv++;
                }
                count++;
        }
    }
    if(inv %2 === 0) return true;
    return false;
}
const checkDown= (board,row,col,items)=>{
    if(!board[row]) return false;
    if(board[row][col] === 0) return true;
    if(checkDown(board,row+1,col,items)){
        items[board[row][col]]=1;
        board[row+1][col]=board[row][col];
        board[row][col]=0;
        return true;
    }

}
const checkUp= (board,row,col,items)=>{
    if(!board[row]) return false;
    if(board[row][col] === 0) return true;
    if(checkUp(board,row-1,col,items)){
        items[board[row][col]]=1;
        board[row-1][col]=board[row][col];
        board[row][col]=0;
        return true;
    }

}
const checkRight=(board,row,col,items)=>{
    if(!board[row][col] && board[row][col] !== 0 ) return false;
    if(board[row][col] === 0) return true;
    if(checkRight(board,row,col+1,items)){
        items[board[row][col]]=1;
        board[row][col+1]=board[row][col];
        board[row][col]=0;
        return true;
    }

}
const checkLeft= (board,row,col,items)=>{
    if(!board[row][col] && board[row][col] !== 0) return false;
    if(board[row][col] === 0) return true;
    if(checkLeft(board,row,col-1,items)){
        items[board[row][col]]=1;
        board[row][col-1]=board[row][col];
        board[row][col]=0;
        return true;
    }

}
export const move= (pos,board,styles,gameDim)=>{
    const [row,col]=pos;
    const newBoard=createCopy(board);
    const items=new Array(Math.pow(gameDim,2)).fill(-1);
    if(checkDown(newBoard,row,col,items)){
        return {updatedBoard : newBoard,possible : true,items,direction: styles.animateDown};
    }
    if(checkUp(newBoard,row,col,items)){
        return {updatedBoard : newBoard,possible : true,items,direction: styles.animateUp};
    }
    if(checkLeft(newBoard,row,col,items)){
        return {updatedBoard : newBoard,possible : true,items,direction: styles.animateLeft};
    }
    if(checkRight(newBoard,row,col,items)){
        return {updatedBoard : newBoard,possible : true,items,direction: styles.animateRight};
    }
    return {possible : false};
    
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export const checkWin=(board)=>{
      const gameDim=board.length;
      let counter=1;
        for(let i=0 ; i< gameDim ; i++){
            for(let j=0 ; j<gameDim ; j++){
                    if(board[i][j] !== counter++  && (i !== gameDim-1 || j !==gameDim-1)) return false;
            }
        }
        return true;
  }
