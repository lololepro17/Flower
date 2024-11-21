// Solution complète d'un Sudoku valide (grille de base)
const fullSudokuSolution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

// Fonction pour générer une grille de Sudoku aléatoire
const generateRandomSudoku = () => {
    let grid = JSON.parse(JSON.stringify(fullSudokuSolution));
    let emptyCells = 0;
    while (emptyCells < 40) {  // Choisir combien de cases seront vides (ici 40)
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            emptyCells++;
        }
    }
    return grid;
};

// Fonction pour afficher la grille
const createSudokuGrid = (grid) => {
    const table = document.getElementById('sudoku-grid');
    table.innerHTML = '';  // Réinitialiser le tableau à chaque fois

    for (let row = 0; row < 9; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const value = grid[row][col];

            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.value = value === 0 ? '' : value;

            // Désactiver les cases déjà remplies
            if (value !== 0) {
                input.disabled = true;
            }

            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};

// Fonction pour vérifier si le Sudoku est résolu
const checkSudoku = () => {
    const inputs = document.querySelectorAll('input');
    const grid = [];

    // Remplir la grille avec les valeurs saisies
    for (let i = 0; i < inputs.length; i++) {
        const row = Math.floor(i / 9);
        const col = i % 9;
        const value = inputs[i].value ? parseInt(inputs[i].value) : 0;

        if (!grid[row]) grid[row] = [];
        grid[row][col] = value;
    }

    let isValid = true;

    // Vérification des lignes, colonnes et sous-grilles
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();
        const blockSet = new Set();
        for (let j = 0; j < 9; j++) {
            rowSet.add(grid[i][j]);
            colSet.add(grid[j][i]);
            blockSet.add(grid[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3]);
        }
        if (rowSet.size !== 9 || colSet.size !== 9 || blockSet.size !== 9) {
            isValid = false;
        }
    }

    if (isValid) {
        alert('Bravo ! Vous avez résolu le Sudoku !');
    } else {
        alert('La solution est incorrecte. Essayez encore.');
    }
};

// Fonction pour résoudre le Sudoku
const solveSudoku = (grid) => {
    const findEmptyCell = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return { row, col };
                }
            }
        }
        return null;  // Si aucune case vide n'est trouvée
    };

    const isValid = (row, col, num) => {
        // Vérifier la ligne
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num) return false;
        }
        // Vérifier la colonne
        for (let i = 0; i < 9; i++) {
            if (grid[i][col] === num) return false;
        }
        // Vérifier la sous-grille 3x3
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    };

    const solve = () => {
        const emptyCell = findEmptyCell();
        if (!emptyCell) return true;  // Si le Sudoku est résolu

        const { row, col } = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
                grid[row][col] = num;
                if (solve()) return true;
                grid[row][col] = 0;  // Backtrack
            }
        }

        return false;  // Si aucune solution n'est trouvée
    };

    solve();
    createSudokuGrid(grid);  // Mettre à jour l'affichage avec la solution
};

// Initialisation du Sudoku avec une grille aléatoire
let grid = generateRandomSudoku();
createSudokuGrid(grid);

// Gestion des événements
document.getElementById('check-btn').addEventListener('click', checkSudoku);
document.getElementById('solve-btn').addEventListener('click', () => solveSudoku(grid));

// Nouveau bouton pour générer une nouvelle grille
document.getElementById('new-grid-btn').addEventListener('click', () => {
    grid = generateRandomSudoku();  // Générer une nouvelle grille aléatoire
    createSudokuGrid(grid);  // Afficher la nouvelle grille
});
