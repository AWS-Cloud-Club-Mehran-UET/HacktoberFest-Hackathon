import tkinter as tk
from tkinter import messagebox

# Function to check if it's valid to place a number in a particular cell
def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:  # Check row and column
            return False
        if board[row//3*3 + i//3][col//3*3 + i%3] == num:  # Check 3x3 sub-box
            return False
    return True

# Function to solve the Sudoku using backtracking
def solve_sudoku(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == '.':
                for num in '123456789':
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_sudoku(board):
                            return True
                        board[row][col] = '.'  # Undo the choice (backtrack)
                return False
    return True

# Function to fill the Sudoku board from the input
def fill_board():
    board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]
    
    if solve_sudoku(board):
        for i in range(9):
            for j in range(9):
                entry = entries[i][j]
                entry.delete(0, tk.END)
                entry.insert(0, board[i][j])
    else:
        messagebox.showerror("Error", "No solution exists for this Sudoku puzzle!")

# GUI setup using Tkinter
def create_gui():
    global entries
    window = tk.Tk()
    window.title("Sudoku Solver")
    window.geometry("450x600")  # Increased height for spacing

    # Set up background canvas for pastel digits
    canvas = tk.Canvas(window, width=450, height=600, bg="#FADADD", highlightthickness=0)
    canvas.pack(fill="both", expand=True)

    # Adding pastel digits on the background canvas
    pastel_colors = ['#FFB6C1', '#FFD1DC', '#E0BBE4', '#D4A5A5', '#C5C6EF']
    digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    for i in range(5):
        for j in range(5):
            canvas.create_text(60 * j + 50, 60 * i + 50, text=digits[(i + j) % 9], 
                               font=('Arial', 30), fill=pastel_colors[(i + j) % len(pastel_colors)], 
                               angle=45, stipple="gray25")

    # Add heading label at the top
    heading_label = tk.Label(window, text="Sudoku Solver", font=("Arial", 24, "bold"), bg="#FADADD", fg="#FF69B4")
    heading_label.place(relx=0.5, rely=0.05, anchor=tk.CENTER)

    # Frame for Sudoku board entries on top of the background
    frame = tk.Frame(canvas, bg="#FADADD")
    frame.place(relx=0.5, rely=0.4, anchor=tk.CENTER)  # Adjusted position for more space between heading and grid

    entries = [[None for _ in range(9)] for _ in range(9)]

    # Sudoku grid with pink theme
    for i in range(9):
        for j in range(9):
            entry = tk.Entry(frame, width=2, font=('Arial', 18), justify='center', borderwidth=2, 
                             bg="#FFD1DC", fg="#F08080", relief="groove")  # Pink entry boxes
            entry.grid(row=i, column=j, padx=5, pady=5)
            entries[i][j] = entry

    # Solve button with pink theme placed below the grid
    solve_button = tk.Button(window, text="Solve", command=fill_board, font=('Arial', 15), 
                             bg="#FFB6C1", fg="white", activebackground="#FF69B4", 
                             activeforeground="white", borderwidth=3)
    solve_button.place(relx=0.5, rely=0.9, anchor=tk.CENTER)

    window.mainloop()

# Run the GUI
if __name__ == "__main__":
    create_gui()

