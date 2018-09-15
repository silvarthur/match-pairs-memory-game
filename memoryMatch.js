var clickedArray = [];

var interval;
var started = false;
var time = 0;

var ready = true;
var numClompleted = 0;

setUp();

function distributeNumbers() {
    var numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

    numbers.sort(function(item) {
        return .5 - Math.random;
    });

    return numbers;
}

function setUp() {
    var grid = document.getElementsByTagName('td');
    var numbers = distributeNumbers();

    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];

        cell.completed = false;
        cell.clicked = false;
        cell.value = numbers[i];

        cell.addEventListener('mouseenter', function() {
            if (this.completed == false && this.clicked == false) {
                this.style.background = 'orange';
            }
        });

        cell.addEventListener('mouseleave', function() {
            if (this.completed == false && this.clicked == false) {
                this.style.background = 'blue';
            }
        });

        cell.addEventListener('click', function() {
            if (ready == false) {
                return;
            }

            startTimer();

            if (this.completed == false && this.clicked == false) {
                clickedArray.push(this);
                reveal(this);
            }

            if (clickedArray.length == 2) {
                if (clickedArray[0].value == clickedArray[1].value) {
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];

                    if (numClompleted == 16) {
                        alert('You won in ' + time + 'seconds! Congrats!');
                        clearInterval();
                    }
                } else {
                    ready = false;
                    document.getElementById('gridtable').style.border = '5px solid red';

                    setTimeout(function() {
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById('gridtable').style.border = '5px solid black';
                    }, 500);
                }
            }
        });

        document.getElementById('restart').addEventListener('click', function() {
            location.reload();
        });
    }
}

function reveal(cell) {
    cell.style.background = 'red';
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer() {
    if (started == false) {
        interval = setInterval(function() {
            time++;
            document.getElementById('timer').innerHTML = 'Time Elapsed: ' + time + ' seconds.';
        }, 1000);

        started = true;
    }
}

function hide(cell) {
    cell.style.background = 'blue';
    cell.innerHTML = '';
    cell.clicked = false;
}

function complete(cell) {
    numClompleted++;
    cell.completed = true;
    cell.style.background = 'purple';
}