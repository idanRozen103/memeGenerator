'use strict';

var gMeme;

function createMeme(currImg) {
    gMeme = {
        selectedImgId: currImg.id, selectedLineIdx: 0,
        lines: [{ txt: null, size: 40, align: 'center', color: 'white', font: 'Impact', position: { x: gCanvas.width / 2, y: gCanvas.height / 6 } },
        ]
    }
}

function setTxt(txtValue) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txtValue
}

function setTxtSize(size) {
    if (size === 'bigger') gMeme.lines[gMeme.selectedLineIdx].size += 5;
    else gMeme.lines[gMeme.selectedLineIdx].size -= 5
}

function setTxtDirection(to) {
    gMeme.lines[gMeme.selectedLineIdx].align = to;
}

function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].position.y -= 30;

}

function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].position.y += 30;
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    
}

function changeSelectedLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function addLine() {
    if (gMeme.lines.length !== 0) gMeme.selectedLineIdx++
    var newLine = {
        txt: null, size: 40, align: 'center', color: 'white', font: 'Impact', position: { x: gCanvas.width / 2, y: getYposition() }
    }
    gMeme.lines.push(newLine)
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getYposition() {
    var linePos;
    if (gMeme.selectedLineIdx === 0) linePos = gCanvas.height / 6
    else if (gMeme.selectedLineIdx === 1) linePos = gCanvas.height - 50
    else if (gMeme.selectedLineIdx === 2) linePos = gCanvas.height / 2
    else if (gMeme.selectedLineIdx > 2) linePos = gMeme.lines[gMeme.selectedLineIdx - 1].position.y + 50
    return linePos
}
