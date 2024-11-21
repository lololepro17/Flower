import random
import json

# Fonction pour vérifier si un nombre peut être placé à une position donnée
def is_valid(board, row, col, num):
    # Vérifier la ligne
    if num in board[row]:
        return False
    
    # Vérifier la colonne
    for r in range(9):
        if board[r][col] == num:
            return False
    
    # Vérifier le sous-grille 3x3
    start_row, start_col = 3 * (row // 3), 3 * (col // 3)
    for r in range(start_row, start_row + 3):
        for c in range(start_col, start_col + 3):
            if board[r][c] == num:
                return False
    
    return True

# Fonction de backtracking pour générer une grille de Sudoku valide
def generate_sudoku():
    board = [[0] * 9 for _ in range(9)]

    def solve():
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    # Essayer des numéros de 1 à 9
                    numbers = list(range(1, 10))
                    random.shuffle(numbers)
                    for num in numbers:
                        if is_valid(board, row, col, num):
                            board[row][col] = num
                            if solve():
                                return True
                            board[row][col] = 0  # Backtrack
                    return False
        return True

    solve()
    return board

# Générer 100 grilles de Sudoku
sudoku_grids = []
for _ in range(100):
    grid = generate_sudoku()
    sudoku_grids.append(grid)

# Sauvegarder les grilles dans un fichier JSON
with open('sudoku_grids.json', 'w') as f:
    json.dump({"sudoku_grids": sudoku_grids}, f)

print("Le fichier sudoku_grids.json a été créé avec 100 grilles.")
