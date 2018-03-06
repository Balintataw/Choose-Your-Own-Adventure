var setRoom1 = {
    desc: "You wake up alone in a prison cell. There is a filthy bed, a mirror, and of course, an iron lock on the door. Press 1 to inspect the bed Press 2 to inspect the mirror Press 3 to inspect the lock",
    descTwo: "You are back in your cell. Press 1 to inspect the bed Press 2 to inspect the mirror Press 3 to inspect the lock"
}

var setRoom2 = {
    desc: "You eye the piece of glass. You could try to pick the lock with it. Or maybe there is something else you could do? Press 1 to inspect the bed Press 2 to inspect the mirror Press 3 to inspect the lock",
    descTwo: "Gotta make a desicion before someone sees the broken glass. Press 1 to inspect the bed, Press 2 to inspect the mirror, Press 3 to inspect the lock."
}

var lockMethod = {
    desc: "You carefully slide the glass shard into the lock and jiggle it a bit",
    descWin: "You hear the soft 'click' of a tumbler and the lock turns over easily",
    descLose: "You broke it dummy. Good luck explaining this to the warden. When he finds out, your'e in for one hell of a beating"
}

var attackMethod = {
    desc: "With you prison shank in hand, you sit and wait for a chance to strike. After an hour you hear the footsteps of a guard making his rounds. As he approaches, you lunge for his throat!",
    descWin: "You got him and good too. The guard quietly slumps to the floor and you are able to grab his keyring. You step over the awful mess and into the hallway.",
    descLose: "You lunge for the guard but he's no rookie and sees you coming a mile away. Before you know it you're being beaten mercilessly. What did you think was going to happen?"
} 

var lockHallway = {
    desc: "You exit your cell and realize the hallway is empty. You see a laundry cart to your left and a stairway to your right. Press 1 to inspect in the cart, Press 2 to check up the stairway.",
    desc1: "You jump into the laundry cart, bury yourself at the bottom, and wait.",
    desc2: "You creep up the stairs but there are two guards blocking your way forward.",
}

var shankHallway = {
    desc: "You look around but all you see is the guard, a laundry cart, and a stairwell leading up. You see two possible ways out of this place. Press 1 to inspect the guard, Press 2 to check up the stairs.",
    desc1: "You realize your only way out may be with this guard, specifically his uniform. He doesnt have any weapons but you look the part. You dump the guards body in the laundry cart, (no one would ever look in there right?) and head up the stairs",
    desc2: "With a newfound bloodlust overwhelming you, you head on up the stairs, ready to take on anything or anyone.",
}

window.onload = function() {
    var points = 0;
    
    setTimeout(function() {
        var play = confirm(`Are you ready to play?`);
        if (!play) {
            alert(`Have it your way`);
        } else {
            cell(setRoom1.desc);
            points+=5;
        }
    }, 500);
    
    function quit(value) {
        if (value == null) {
            alert(`Have it your way`);
            window.reload();
        }
    }

    // cell escape branch

    function cell(description) {
        var chance = Math.floor(Math.random() * 10);
        points+=chance;
        
        var room1 = prompt(description);
        quit(room1);
        if (room1 == 1) {
            document.getElementById("myDiv").style.backgroundImage = 'url(./images/bed.jpeg)';
            setTimeout(function() {
                alert(`The bed is uncomfortable but otherwise unimportant`);
                document.getElementById("myDiv").style.backgroundImage = 'url(./images/cell1.jpg)';
                setTimeout(function() {
                    cell(setRoom1.descTwo);
                },500);
            },500);
        } else if (room1 == 2) {
            document.getElementById("myDiv").style.backgroundImage = 'url(./images/mirror.jpg)';
            setTimeout(function() {
                alert(`You look at the mirror and realize it's cracked. You remove a thin piece of glass.`);
                document.getElementById("myDiv").style.backgroundImage = 'url(./images/cell1.jpg)';
                setTimeout(function() {
                    cellTwo(setRoom2.desc)
                },500);
            },500);
        } else if (room1 == 3) {
            document.getElementById("myDiv").style.backgroundImage = 'url(./images/lock.jpeg)';
            setTimeout(function() {
                alert(`The lock is old but sturdy, nothing you can do to it now.`);
                document.getElementById("myDiv").style.backgroundImage = 'url(./images/cell1.jpg)';
                setTimeout(function() {
                    cell(setRoom1.descTwo);
                },500);
            }, 500);            
        } else {
            alert(`Please enter "1", "2", or "3"`)
            points-=3;
            cell(setRoom1.descTwo);
        }
    }

    function cellTwo(description) {
        var chance = Math.floor(Math.random() * 10);
        points+=chance;

        var room2 = prompt(description);
        quit(room2);

        if (room2 == 1) {
            alert(`You cut the sheets up and wrap part of the glass to make a crude handle.`);
            attackGuard(attackMethod.desc);
        } else if (room2 == 2) {
            alert(`It's still broken`);
            cellTwo(setRoom2.descTwo)
        } else if (room2 == 3) {
            alert(`You have no idea what you're doing but it may be your best and only chance to escape. You approach the lock.`);
            pickLock(lockMethod.desc);
        } else {
            alert(`Please enter "1", "2", or "3"`);
            points-=3
            cellTwo(setRoom2.descTwo);
        }
    }

    // lock branch

    function pickLock(description) {
        var chance = Math.floor(Math.random() * 10);
        points+=chance;

        alert(description)
        if (chance > 3) {
            alert(lockMethod.descWin);
            points+=chance;
            hallwayLock(lockHallway.desc);
        } else {
            alert(lockMethod.descLose);
            loseGame();
        }
    }

    function hallwayLock(description) {
        var chance = Math.floor(Math.random() * 10);
        points+=chance;

        var hall1 = prompt(description)
        quit(hall1);

        if (hall1 == 1) {
            alert(lockHallway.desc1);
            hallwayLockCart()
        }  else if (hall1 == 2) {
            alert(lockHallway.desc2)
            hallwayLockStairs();
        } else {
            alert(`Please enter "1", "2"`);
            points-=3;
            hallwayLock(lockHallway.desc);
        }
    }

    // win scenario 1
    
    function hallwayLockCart() {
        var chance = Math.floor(Math.random() * 10);
        if (chance > 5) {
            alert(`You hear footsteps approaching the cart. It goes quiet. Then all of a sudden your moving. It's a long perilous trip and you're sure you are going to be caught, but the cart stops and footsteps fade into another room.`);
            alert(`You emerge to see an open cargo door and a truck with keys and no driver. This is your chance. You drive straight to Mexico and grab a beer.`)
            points+=chance;
            
            winGame();
        } else {
            alert(`You hear footsteps approaching the cart. It goes quiet. Then the cart lunges and someone groans. They obviously noticed the extra weight! Seconds later you are being dragged out of the cart and being beaten mercilessly. You were so close!`);
            loseGame();
        }       
    }
    // win scenario 2
    function hallwayLockStairs() {
        var chance = Math.floor(Math.random() * 10);
        if (chance > 5) {
            alert(`You approach the guards quietly when all of a sudden they take off down another hallway. Probably going to beat another prisoner. But lucky for you, they've left a clear way to the exit.`);
            alert(`You don't stop for one second to wonder why there is an unguarded exit in this prison and you make a break for it, running all the way to Mexico, where you grab a beer`)
            points+=chance;
            winGame()
        } else {
            alert(`You creep up the stairs and try to slip by when the guards are distracted but luck is not on your side today. Before you know it you are waking up in a new cell, bruised from a very aggressive beating. You won't try that again. Or will you?`)
            loseGame();
        }
    }

    // shank branch

    function attackGuard(description) {
        var chance = Math.floor(Math.random() * 10);
        alert(description);
        if (chance > 3) {
            alert(attackMethod.descWin);
            points+=chance;
            hallwayShank(shankHallway.desc)
        } else {
            alert(attackMethod.descLose);
            loseGame();
        }
    }

    function hallwayShank(description) {
        var chance = Math.floor(Math.random() * 10);
        points+=chance;

        var hall1 = prompt(description);
        quit(hall1);

        if (hall1 == 1) {
            alert(shankHallway.desc1)
            uniform();
        } else if (hall1 == 2) {
            alert(shankHallway.desc2)
            bloodlust();
        } else {
            alert(`Please enter "1", "2"`);
            points-=3;            
            hallwayShank(shankHallway.desc)
        }
    }

    // win scenario 3

    function uniform() {
        var chance = Math.floor(Math.random() * 10);
        if (chance > 5) {
            alert(`You reach the top of the stairs and see two other guards. They look at you briefly and go back to whatever they were doing. You don't stop to wonder who these idiots are though and quickly head through the nearest door.`);
            alert(`Any other time, you might wonder how nobody recognizes you, or the blood stains on the uniform, but no one says a word as you walk out the door and head straight for Mexico. You grab a beer.`)
            points+=chance;
            winGame();
        } else {
            alert(`You gather yourself together and walk up the stairs. Two guards immediately look your direction and turn toward you. Maybe it's the bead of sweat on your forehead that gives you away. Either that or the big blood stain on your new uniform. It doesn't matter though as before you know it, you're being beat to a pulp. What did you think was going to happen?`);
            loseGame();
        }    
    }

    // win scenrio 4

    function bloodlust() {
        var chance = Math.floor(Math.random() * 10);
        if (chance > 5) {
            alert(`With rage in your heart and blood on your hands, you sprint up the stairs. Stabbing wildly, you take out two guards who didn't see you coming. You feel invincible! No one is going to stop you now, but it doesn't matter because there is no one else around to witness this horror. You don't stop to think about why, bolt out the nearest door, and leave a trail of stabby carnage all the way to Mexico, where you grab a beer.`)
            points+=chance;
            winGame()
        } else {
            alert(`Terrified you bolt up the stairs. Two guards turn to intercept you! You swing at the first but you are quickly overpowered. Before you can swing again you are being beat senseless by a group of guards. Did you really think you were going to slash your way out of here?`)
            loseGame();
        }
    }

    function winGame() {
        document.getElementById("myDiv").style.backgroundImage = 'url(./images/4.jpg)';
        setTimeout(function() {
            alert(`Enjoy your beer! Your Score: ${points}`);
        }, 500);    
    }

    function loseGame() {
        alert(`Try for another beating? Your Score: ${points}`);
    }
 
}