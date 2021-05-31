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
    if (towards) {
        if (to.xPos > from.xPos) {
            from.setRightDirection(true);
        } else if (to.xPos < from.xPos) {
            from.setLeftDirection(true);
        }
        if (to.yPos > from.yPos) {
            from.setDownDirection(true);
        } else if ((to.yPos < from.yPos)) {
            from.setUpDirection(true);
        }
    } else {
        if (to.xPos < from.xPos) {
            from.setRightDirection(true);
        } else if (to.xPos > from.xPos) {
            from.setLeftDirection(true);
        }
        if (to.yPos < from.yPos) {
            from.setDownDirection(true);
        } else if ((to.yPos > from.yPos)) {
            from.setUpDirection(true);
        }
    }

}

function think(arrPulpos, indxPulpo) {
    // let nearestPulpo;
    // let nearestDistance = 10000;
    // for (let pulpo in arrPulpos) {
    //     let distance = distanceBetweenEntities(arrPulpos[indxPulpo], arrPulpos[pulpo]);
    //     if (pulpo != indxPulpo && distance< nearestDistance) {
    //             nearestDistance = distance;
    //             nearestPulpo = arrPulpos[pulpo];
    //     }
    // }
    // let normalisedDistance = nearestDistance / maxDistance;


    arrPulpos[indxPulpo].setUpDirection(false);
    arrPulpos[indxPulpo].setDownDirection(false);
    arrPulpos[indxPulpo].setLeftDirection(false);
    arrPulpos[indxPulpo].setRightDirection(false);

    // if (Math.random() < normalisedDistance) {
    //     selectDirection(true, arrPulpos[indxPulpo], nearestPulpo)
    // } else {
    //     selectDirection(false, arrPulpos[indxPulpo], nearestPulpo)
    // }


    // if (Math.random() > 0.995) {
    //     console.log("xd")
    //     arrPulpos[indxPulpo].placeBomb()
    // }

    arrPulpos[indxPulpo].update()

}