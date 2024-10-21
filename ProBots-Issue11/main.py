def solveSudoku(board):
    
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    
    empty_cells = []
    for r in range(9):
        for c in range(9):
            if board[r][c] == '.':
                empty_cells.append((r, c))
            else:
                num = board[r][c]
                rows[r].add(num)
                cols[c].add(num)
                boxes[(r // 3) * 3 + (c // 3)].add(num)

    def backtrack(index):
        # If we've filled all empty cells, the board is solved
        if index == len(empty_cells):
            return True

        row, col = empty_cells[index]
        box_index = (row // 3) * 3 + (col // 3)

        
        for num in '123456789':
            if num not in rows[row] and num not in cols[col] and num not in boxes[box_index]:
                
                board[row][col] = num
                rows[row].add(num)
                cols[col].add(num)
                boxes[box_index].add(num)

                
                if backtrack(index + 1):
                    return True

                
                board[row][col] = '.'
                rows[row].remove(num)
                cols[col].remove(num)
                boxes[box_index].remove(num)

        return False

    backtrack(0)

board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]

solveSudoku(board)
print(board)
