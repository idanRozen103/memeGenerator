
// var gKeywords = {'happy': 0,'funny puk': 0} 
var gCanvas;
var gCtx;
// var gMeme = {
//     selectedImgId: 5, selectedLineIdx: 0,
//     lines: [{ txt: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
// }

function init() {
    document.querySelector('.meme-editing').style.display = 'none'
    renderGallery()
    gCanvas = document.querySelector('#myCanvas');
    gCtx = gCanvas.getContext('2d');
}

function renderGallery() {
    // var images = getPictures();
    // if (!images) images = gImgs
    var images = gImgs
    var strHtml = images.map(function (img) {
        return ` <img src=${img.url} onclick="onEditMeme(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml.join('')
}

function onEditMeme(imgId) {
    let currImgIdx = findIdxById(imgId, gImgs)
    renderEditingPage(gImgs[currImgIdx])
}

function renderEditingPage(currImg) {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.meme-editing').style.display = 'flex'
    drawImgFromlocal(currImg)
}


function drawImgFromlocal(currImg) {
    var img = new Image()
    img.src = currImg.url;
    img.onload = () => {
        renderCanvas(img)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
    }
}

function renderCanvas(img) {
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onGoToGallery(){
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.meme-editing').style.display = 'none'
}