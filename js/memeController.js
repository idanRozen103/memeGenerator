'use strict';

// var gKeywords = {'happy': 0,'funny puk': 0} 
var gCanvas;
var gCtx;
var gCurrImg;

function renderEditingPage(currImg) {
    gCanvas = document.querySelector('#myCanvas');
    gCtx = gCanvas.getContext('2d');
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.meme-editing').style.display = 'flex'
    drawImgFromlocal(currImg)
    createMeme(currImg)
}

function resizeCanvas() {
    const elCanvas = document.querySelector('.canvas-container')
    // var scale = Math.max(gCurrImg.height / gCurrImg.width, gCurrImg.width / gCurrImg.height)
    var scale = gCurrImg.width / gCurrImg.height


    console.log(elCanvas.offsetWidth);

    if (elCanvas.offsetWidth < 500) {
        gCanvas.width = elCanvas.offsetWidth;
        gCanvas.height = gCanvas.width / scale
        // gCanvas.height = (scale === 1) ? elCanvas.offsetHeight : ((gCurrImg.height < gCanvas.height / 2) ? gCurrImg.height * scale : (gCurrImg.height > gCanvas.height) ? gCanvas.height / scale : gCurrImg.height / scale)
    }
    else {
        console.log(gCurrImg.width/ gCurrImg.height);
        gCanvas.height = elCanvas.offsetHeight;
        gCanvas.width =gCanvas.height * scale 
        
        // ((gCurrImg.width < gCanvas.width ) ? gCurrImg.width / scale : (gCurrImg.width > gCanvas.width) ? gCanvas.width / scale : gCurrImg.width / scale)
        // : (gCurrImg.width > gCanvas.width) ? gCanvas.width / scale : gCurrImg.width / scale)
    }
}

// gCanvas.height = elCanvas.offsetHeight;
// gCanvas.width = (scale === 1) ? elCanvas.offsetWidth : ((gCurrImg.width > gCurrImg.height) ? gCurrImg.width * (gCanvas.height/gCanvas.width) : elCanvas.offsetWidth)


function onGoToGallery() {
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.meme-editing').style.display = 'none'
}

function onSetTxt(txtValue) {
    if (gMeme.lines.length === 0) onAddLine()
    setTxt(txtValue)
    renderCanvas()
}

function renderCanvas() {
    gCtx.drawImage(gCurrImg, 0, 0, gCanvas.width, gCanvas.height);
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
        gCtx.strokeText(line.txt, gCanvas.width / 2, line.position.y);
        gCtx.fillText(line.txt, gCanvas.width / 2, line.position.y);
    });
}

function drawImgFromlocal(currImg) {
    var img = new Image()
    img.src = currImg.url;
    img.onload = () => {
        gCurrImg = img;
        gCanvas.height = 450
        gCanvas.width = 450
        resizeCanvas()
        renderCanvas()
    }
}

function onChangeTxtSize(size) {
    setTxtSize(size)
    renderCanvas()
}

function onChangeTxtDirection(to) {
    setTxtDirection(to)
    renderCanvas()
}

function onLineUpward() {
    moveLineUp()
    renderCanvas()
}

function onLineDownward() {
    moveLineDown()
    renderCanvas()
}


function onChangeFillColor(color) {
    setFillColor(color)
    renderCanvas()
}


function onAddLine() {
    addLine()
}

function onSwitchLine() {
    changeSelectedLine()
}

function onChangeFont(font) {
    changeFont(font)
    renderCanvas()

}

function onRemoveLine() {
    removeLine()
    renderCanvas()
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
    document.querySelector('form .btn').style.zIndex = '-4'
    document.querySelector('form .btn').style.position = 'absolute'

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
