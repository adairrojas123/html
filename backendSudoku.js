
function limpiar() {
    for (var i = 0; i < 81; i++) {
        document.getElementsByTagName("input")[i].value = "";
        document.getElementsByTagName("input")[i].style.color = 'blue';
    }
}


function getRespuesta() {
    var bool = check_input();

    if (bool) {
        var grid = readAPuzzle();
        if (!isValidGrid(grid)) {
            alert("Datos invalidos");
        } else {
            if (search(grid)) {
                output_ans();
            } else {
                alert("Sin solucion");
            }
        }
    }
}


function check_input() {
    var arr = new Array();

    for (var i = 0; i < 81; i++) {
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if (isNaN(arr[i])) {
            alert('Solo datos del 1 al 9');
            return false
        }
    }

    if (arr.every(function isZero(x) { return x == 0 })) {
        alert('Ingrese los datos');
        return false
    }

    return true
}

function readAPuzzle() {
    var arr = new Array();

    for (var i = 0; i < 81; i++) {
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
    }

    var grid = new Array();
    for (var i = 0; i < 9; i++) {
        grid[i] = new Array();
        for (var j = 0; j < 9; j++) {
            grid[i][j] = 0;
        }
    }


    for (var i = 0; i < 81; i++) {
        grid[Math.floor(i / 9)][i % 9] = arr[i];
    }

    return grid
}

function getFreeCellList(grid) {
    var freeCellList = new Array();
    index = 0

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (grid[i][j] == 0) {
                freeCellList[index] = new Array(i, j);
                index++;
            }
        }
    }

    return freeCellList
}

function isValid(i, j, grid) {
    for (var column = 0; column < 9; column++) {
        if ((column != j) && (grid[i][column] == grid[i][j])) {
            return false
        }
    }

    for (var row = 0; row < 9; row++) {
        if ((row != i) && (grid[row][j] == grid[i][j])) {
            return false
        }
    }

    for (var row = Math.floor(i / 3) * 3; row < Math.floor(i / 3) * 3 + 3; row++) {
        for (var col = Math.floor(j / 3) * 3; col < Math.floor(j / 3) * 3 + 3; col++) {
            if ((row != i) && (col != j) && (grid[row][col] == grid[i][j])) {
                return false
            }
        }
    }

    return true 
}

function isValidGrid(grid) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if ((grid[i][j] < 0) || (grid[i][j] > 9) || ((grid[i][j] != 0) && (!isValid(i, j, grid)))) {
                return false
            }
        }
    }
    return true
}



function search(grid) {
    var freeCellList = getFreeCellList(grid);
    var numberOfFreeCells = freeCellList.length;
    if (numberOfFreeCells == 0) {
        return true
    }

    var k = 0; 

    while (true) {
        var i = freeCellList[k][0];
        var j = freeCellList[k][1];
        if (grid[i][j] == 0) {
            grid[i][j] = 1;
        }

        if (isValid(i, j, grid)) {
            if (k + 1 == numberOfFreeCells) {
                
                return true 
            } else {
                
                k++;
            }
        } else {
            if (grid[i][j] < 9) {
                
                grid[i][j]++;
            } else {
                
                while (grid[i][j] == 9) {
                    if (k == 0) {
                        return false 
                    }
                    grid[i][j] = 0; 
                    k--; 
                    i = freeCellList[k][0];
                    j = freeCellList[k][1];

                }
                
                grid[i][j]++;
            }
        }
    }
}

function output_ans() {

    var grid = readAPuzzle();
    var grid_original = readAPuzzle();

    if (search(grid)) {
        for (var i = 0; i < 81; i++) {
            if (grid[Math.floor(i / 9)][i % 9] != grid_original[Math.floor(i / 9)][i % 9]) {
                document.getElementsByTagName("input")[i].value = grid[Math.floor(i / 9)][i % 9];
                document.getElementsByTagName("input")[i].style.color = 'black';
            }
        }
    }

}