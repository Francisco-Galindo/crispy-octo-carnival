let maxDistance;

function setMaxDistance() {
    maxDistance = distanceBetweenEntities(map.getTileContent(0, 0), 
    map.getTileContent(map[0].length-1, map.length-1))
}


function distanceBetweenEntities(entity1, entity2) {
    if (entity1 instanceof Entidad && entity2 instanceof Entidad) {
        let disX = (entity1.xPos + (TILESIZE / 2)) - (entity2.xPos + (TILESIZE / 2));
        let disy = (entity1.yPos + (TILESIZE / 2)) - (entity2.yPos + (TILESIZE / 2));
    
        return Math.sqrt(disX**2 + disy**2);
    }
    return null;
}

function selectDirection(towards, from, to) {
    if (to !== null) {
        if (to[0] > from.xPos) {
            from.setRightDirection(true);
        } else if (to[0] < from.xPos) {
            from.setLeftDirection(true);
        }
        if (to[1] > from.yPos) {
            from.setDownDirection(true);
        } else if ((to[1] < from.yPos)) {
            from.setUpDirection(true);
        }
    } else {
        console.log(to)
    }

}

function getNearbyTiles(pulpo) {
    let x = Math.trunc(pulpo.xPos/TILESIZE);
    if (pulpo.xPos % TILESIZE > TILESIZE/2) {
        x++;
    }
    let y = Math.trunc(pulpo.yPos/TILESIZE);
    if (pulpo.yPos % TILESIZE > TILESIZE/2) {
        y++;
    }
    let nearbyTiles = [];
    for (let i = x-1; i <= x+1; i++) {
        let row = []
        for (let j = y-1; j <= y+1; j++) {
            let tile = map.getTileContent(i, j);
            row.push(tile);
        }	
        nearbyTiles.push(row);
    }
    return nearbyTiles;
}

function isPlacingBombSafe(nearbyTiles) {
    if ((nearbyTiles[0][0] === null && (nearbyTiles[0][1] === null || nearbyTiles[1][0] === null)) ||
        (nearbyTiles[0][2] === null && (nearbyTiles[0][1] === null || nearbyTiles[1][2] === null)) ||
        (nearbyTiles[2][0] === null && (nearbyTiles[2][1] === null || nearbyTiles[1][0] === null)) ||(nearbyTiles[2][2] === null && (nearbyTiles[2][1] === null || nearbyTiles[1][2] === null))) {
            return true;
        }
    return false;
}

function getBombsInTiles(nearbyTiles) {
    let bombs = [];
    for (let i in nearbyTiles) {
        for (let j in nearbyTiles[i]) {
            if  (nearbyTiles[i][j] instanceof Bomba) {
                bombs.push(nearbyTiles[i][j]);
            }
        }
    }
    return bombs;
}

function getSafeTile(nearbyTiles, bombs, nearestPulpo, x, y) {
    let safeCoords = []
    for (let i in nearbyTiles) {
        for (let j in nearbyTiles[i]) {
            // if (nearbyTiles[i][j] === null && (i !== 1 && j !== 1) &&
            //     (nearbyTiles[i+1] === undefined || !nearbyTiles[i+1][j] instanceof Bomba) &&
            //     (nearbyTiles[i][j+1] === undefined || !nearbyTiles[i][j+1] instanceof Bomba) && 
            //     (i == 0 || !nearbyTiles[i-1][j] instanceof Bomba) && 
            //     (j == 0 || !nearbyTiles[i][j-1] instanceof Bomba)) {

            //         safeCoords.push([i * TILESIZE,j * TILESIZE]);
            // }

            let safe = true;
            for (bomb of bombs) {
                if (nearbyTiles[i][j] !== null) {
                    safe = false;
                }
                if ((x-1+i) * TILESIZE == bomb.xPos || Math.abs((y-1+j) * TILESIZE - bomb.yPos) < TILESIZE) {
                    safe = false;
                }
                if ((y-1+j) * TILESIZE == bomb.yPos || Math.abs((x-1+i) * TILESIZE - bomb.xPos) < TILESIZE) {
                    safe = false;
                }
            }


            if (safe) {
                safeCoords.push([i * TILESIZE,j * TILESIZE]);
            }
        }
    }

    if (safeCoords.length > 0) {
        let safeCoord;
        let minDistance = maxDistance;
        for (let i in safeCoords) {
            let distance = distanceBetweenEntities(safeCoords[i], nearestPulpo);
            if (distance < minDistance) {
                minDistance = distance;
                safeCoord = safeCoords[i];
            }
        }
        return safeCoord;
    }
    return null;

}

function think(arrPulpos, indxPulpo) {
    let nearestPulpo;
    let nearestDistance = maxDistance;
    for (let pulpo in arrPulpos) {
        let distance = distanceBetweenEntities(arrPulpos[indxPulpo], arrPulpos[pulpo]);
        if (pulpo != indxPulpo && distance< nearestDistance) {
                nearestDistance = distance;
                nearestPulpo = arrPulpos[pulpo];
        }
    }
    let normalisedDistance = nearestDistance / maxDistance;


    arrPulpos[indxPulpo].setUpDirection(false);
    arrPulpos[indxPulpo].setDownDirection(false);
    arrPulpos[indxPulpo].setLeftDirection(false);
    arrPulpos[indxPulpo].setRightDirection(false);


    let x = Math.trunc(arrPulpos[indxPulpo].xPos/TILESIZE);
    if (arrPulpos[indxPulpo].xPos % TILESIZE > TILESIZE/2) {
        x++;
    }
    let y = Math.trunc(arrPulpos[indxPulpo].yPos/TILESIZE);
    if (arrPulpos[indxPulpo].yPos % TILESIZE > TILESIZE/2) {
        y++;
    }

    let nearbyTiles = getNearbyTiles(arrPulpos[indxPulpo])
    // if (isPlacingBombSafe(nearbyTiles) && Math.random() > 0.9) {
    //     arrPulpos[indxPulpo].placeBomb()
    // }
    let bombs = getBombsInTiles(nearbyTiles);
    let safeCoords = getSafeTile(nearbyTiles, bombs, nearestPulpo, x, y);
    selectDirection(true, arrPulpos[indxPulpo], safeCoords);


    arrPulpos[indxPulpo].update()

}