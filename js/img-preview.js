createImagePreview("btn");
function createImagePreview(clickDetection) {
    // Create full screen image preview if it doesn't already exist
    var pre = document.querySelector(".image-preview");
    if (!pre) {
        var imgPreview = document.createElement("div");
        imgPreview.setAttribute("class", "image-preview");
        imgPreview.setAttribute("data-click-detection", clickDetection);
        imgPreview.setAttribute("onclick", "closeImgPreview()");
        document.body.insertBefore(imgPreview, document.body.firstChild);
        // Img
        var img = document.createElement("img");
        img.setAttribute("draggable", "false");
        imgPreview.appendChild(img);
        // Close btn
        var closeBtn = document.createElement("div");
        closeBtn.setAttribute("class", "image-preview-close-btn");
        closeBtn.setAttribute("onclick", "closeImgPreview()");
        imgPreview.appendChild(closeBtn);
        // Close btn a
        var closeBtnA = document.createElement("a");
        closeBtnA.innerHTML = "&#215;";
        closeBtn.appendChild(closeBtnA);
        // Previous btn
        var previousBtn = document.createElement("div");
        previousBtn.setAttribute("class", "image-preview-previous-btn");
        imgPreview.appendChild(previousBtn);
        // Previous btn a
        var previousBtnA = document.createElement("a");
        previousBtnA.innerHTML = "&#139;";
        previousBtn.appendChild(previousBtnA);
        // Next btn
        var nextBtn = document.createElement("div");
        nextBtn.setAttribute("class", "image-preview-next-btn");
        imgPreview.appendChild(nextBtn);
        // Next btn a
        var nextBtnA = document.createElement("a");
        nextBtnA.innerHTML = "&#155;";
        nextBtn.appendChild(nextBtnA);
    }
}

// Set buttoms
setImagePreviewBtns();

function setImagePreviewBtns() {
    var imgPreviewEl = document.querySelector(".image-preview");
    if (imgPreviewEl) {
        var img = imgPreviewEl.querySelector("img");
        if (img) img.setAttribute("onclick", "event.stopPropagation();");
        var clickScreen = imgPreviewEl.getAttribute("data-click-detection") == "screen" ? true : false;
        var leftBtn = imgPreviewEl.querySelector(clickScreen ? ".image-preview-previous-btn" : ".image-preview-previous-btn a");
        if (leftBtn) leftBtn.setAttribute("onclick", "event.stopPropagation();selectNextPreviewImg(false)");
        var rightBtn = imgPreviewEl.querySelector(clickScreen ? ".image-preview-next-btn" : ".image-preview-next-btn a");
        if (rightBtn) rightBtn.setAttribute("onclick", "event.stopPropagation();selectNextPreviewImg(true)");
    }
}
// Gallery items
var galleryImgs;
// Select the next previewe image if 'next' parameter is false it selects the previous image
function selectNextPreviewImg(next) {
    if (galleryImgs && galleryImgs.length > 0) {
        var imagePreview = document.querySelector(".image-preview");
        var img = imagePreview.querySelector("img");
        var getNext = false;
        var currentUrl = img.getAttribute("src");
        var start = next ? 0 : galleryImgs.length - 1;
        for (var i = 0; i < galleryImgs.length; i++) {
            var index = next ? i : (galleryImgs.length - 1) - i;
            var url = galleryImgs[index].getAttribute("src");
            var alt = galleryImgs[index].getAttribute("alt");
            if (getNext && url != currentUrl) {
                setImgUrl(img, url, alt);
                break;
            } else if (url == currentUrl) {
                // If its the last image restart
                if ((next && index === galleryImgs.length - 1) || (!next && index === 0)) {
                    setImgUrl(img, galleryImgs[start].getAttribute("src"), galleryImgs[start].getAttribute("alt"));
                } else getNext = true;
            }
        }
    }
}

function setImgUrl(img, src, alt) {
    img.setAttribute("src", src);
    img.setAttribute("alt", alt);
}

function showFullScreen(el) {
    var imagePreview = document.querySelector(".image-preview");
    if (imagePreview) {
        // Get all images assigned to this gallery
        var gallery = el.closest('div[data-gallery]');
        if (gallery) {
            var galID = gallery.getAttribute("data-gallery");
            if (galID) {                
                var added = new Array;
                galleryImgs = new Array;
                document.querySelectorAll("[data-gallery='" + galID + "'] img").forEach(el => {
                    var v = el.getAttribute("src");
                    // Don't add duplicates
                    if (!added.includes(v)) {
                        added.push(v);
                        galleryImgs.push(el);
                    }
                });
            }
        }
        var img = imagePreview.querySelector("img");
        var imgUrl = el.getAttribute("src");
        img.setAttribute("src", imgUrl);
        imagePreview.style.display = "unset";
        // Disable body scroll
        var body = document.querySelector("body");
        if (body) {
            body.style.overflow = "hidden";
            body.style.height = "100%";
        }
    }
}

function closeImgPreview() {
    var imagePreview = document.querySelector(".image-preview");
    if (imagePreview) {
        imagePreview.style.display = "none";
        galleryImgs = null;
        // Enable body scroll
        var body = document.querySelector("body");
        if (body) {
            body.style.overflow = "auto";
            body.style.height = "unset";
        }
    }
}
