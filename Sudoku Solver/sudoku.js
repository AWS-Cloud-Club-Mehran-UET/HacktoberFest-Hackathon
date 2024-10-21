
function isSafe(puzzle, row, col, num)
{
    
    for(let d = 0; d < puzzle.length; d++)
    {
        
        if (puzzle[row][d] == num)
        {
            return false;
        }
    }

    for(let r = 0; r < puzzle.length; r++)
    {
         
        if (puzzle[r][col] == num)
        {
            return false;
        }
    }

    let sqrt = Math.floor(Math.sqrt(puzzle.length));
    let boxRowStart = row - row % sqrt;
    let boxColStart = col - col % sqrt;

    for(let r = boxRowStart;
            r < boxRowStart + sqrt; r++)
    {
        for(let d = boxColStart;
                d < boxColStart + sqrt; d++)
        {
            if (puzzle[r][d] == num)
            {
                return false;
            }
        }
    }

    return true;
}

function solveSudoku(puzzle, length)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < length; i++)
    {
        for(let j = 0; j < length; j++)
        {
            if (puzzle[i][j] == 0)
            {
                row = i;
                col = j;

                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }

    if (isEmpty)
    {
        return true;
    }

    for(let num = 1; num <= length; num++)
    {
        if (isSafe(puzzle, row, col, num))
        {
            puzzle[row][col] = num;
            if (solveSudoku(puzzle, length))
            {
                
                return true;
            }
            else
            {
                puzzle[row][col] = 0;
            }
        }
    }
    return false;
}


function arrToNumber(arr){
    var numarr=[]

    for(var i=0;i<arr.length;i++){
        var nums = arr[i].map(function(str) {
        if(str==="."){
            return 0;
        }
         return parseInt(str); }
         );
         numarr.push(nums);
    }

    return numarr;
}


function arrToString(arr){
    let arrStr=[]   
    for(let i=0;i<2;i++){
    let strArr = arr.map(function (e) {
        return e.toString()
    });
    arrStr.push(strArr)
    return arrStr;
}
}


let input=[
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
];


let puzzle=arrToNumber(input);
        
let length = puzzle.length;

    solveSudoku(puzzle, length)
    puzzle=arrToString(puzzle);
    console.log(puzzle);




