'use strict';

// var gKeywords = {'happy': 0,'funny puk': 0} 
var gCanvas;
var gCtx;

function renderEditingPage(currImg) {
    gCanvas = document.querySelector('#myCanvas');
    gCtx = gCanvas.getContext('2d');
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.meme-editing').style.display = 'flex'
    drawImgFromlocal(currImg)
    createMeme(currImg)
}

function renderCanvas(img) {
    var scale = Math.max(gCanvas.width / img.width, gCanvas.height / img.height);
    var x = (gCanvas.width / 2) - (img.width / 2) * scale;
    var y = (gCanvas.height / 2) - (img.height / 2) * scale;
    gCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

function onGoToGallery() {
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.meme-editing').style.display = 'none'
}

function onSetTxt(txtValue) {
    if (gMeme.lines.length === 0) onAddLine()
    setTxt(txtValue)
    redrawCanvas()
}

function redrawCanvas() {
    let elImg = document.querySelector(`[data-id='${gMeme.selectedImgId}']`)
    renderCanvas(elImg)
    drawText()
}

function drawText() {
    var lines = gMeme.lines

    lines.forEach(function (line) {
        if (!line.txt) return
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = line.color;
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = '2';
        gCtx.textAlign = line.align;
        gCtx.strokeText(line.txt, line.position.x, line.position.y);
        gCtx.fillText(line.txt, line.position.x, line.position.y);
    });
}

function drawImgFromlocal(currImg) {
    var img = new Image()
    img.src = currImg.url;
    img.onload = () => {
        renderCanvas(img)
    }
}

function onChangeTxtSize(size) {
    setTxtSize(size)
    redrawCanvas()
}

function onChangeTxtDirection(to) {
    setTxtDirection(to)
    redrawCanvas()
}

function onLineUpward() {
    moveLineUp()
    redrawCanvas()
}

function onLineDownward() {
    moveLineDown()
    redrawCanvas()
}


function onChangeFillColor(color) {
    setFillColor(color)
    redrawCanvas()
}


function onAddLine() {
    addLine()
}

function onSwitchLine() {
    changeSelectedLine()
}

function onChangeFont(font) {
    changeFont(font)
    redrawCanvas()

}

function onRemoveLine() {
    removeLine()
    redrawCanvas()
}


function downloadCanvas(elLink) {
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-meme.jpg';
}


function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="upload btn fab control" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;"> Share Meme
        </a>`
    }

    doUploadImg(elForm, onSuccess);

}

function doUploadImg(elForm, onSuccess) {
    document.querySelector('form .btn').style.zIndex = '-1'

    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}
