

function init() {
    document.querySelector('.meme-editing').style.display = 'none'
    document.querySelector('.body').style.overflowY = 'hidden'
    renderGallery()
}

function renderGallery() {
    // var images = getPictures();
    // if (!images) images = gImgs
    var images = gImgs
    var strHtml = images.map(function (img) {
        return ` <img src=${img.url} data-id="${img.id}" onclick="onEditMeme(${img.id})">`
    })
    document.querySelector('.gallery-container').innerHTML = strHtml.join('')
}

function onEditMeme(imgId) {
    let currImgIdx = findIdxById(imgId, gImgs)
    renderEditingPage(gImgs[currImgIdx])
}

