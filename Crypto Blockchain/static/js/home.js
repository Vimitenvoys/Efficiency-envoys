function onloadfunctions() {
    getbizname()
    getTAMLabels()
}

function savebizname() {
    var BusinessName = document.getElementsByName('BusinessName')
    sessionStorage.setItem('BusinessName', BusinessName[0].value)
}

function getbizname() {
    var bizname = document.getElementsByName('BusinessName')
    bizname[0].value = sessionStorage.getItem('BusinessName')
}

function saveTAM() {
    var TAMLabel = document.getElementsByName('TAMLabel')
    var TAMinput = document.getElementsByName('TAMinput')
    var TAMLabels = []
    var TAMinputs = []
    TAMLabel.forEach(i => {
        TAMLabels.push(i.value)
    });
    TAMinput.forEach(i => {
        TAMinputs.push(i.value)
    });
    try {
        sessionStorage.setItem('TAMLabels', JSON.stringify(TAMLabels))
        sessionStorage.setItem('TAMinputs', JSON.stringify(TAMinputs))
        success()
    } catch (error) {
        error(error.message)
    }
}

function getTAMLabels() {
    var TAMLabel = document.getElementsByName('TAMLabel')
    var TAMinput = document.getElementsByName('TAMinput')
    var TAMLabels = sessionStorage.getItem('TAMLabels')
    var TAMinputs = sessionStorage.getItem('TAMinputs')
    // filtering (,) from the sessions storage
    TAMLabels = filtercomma(JSON.parse(TAMLabels))
    TAMinputs = filtercomma(JSON.parse(TAMinputs))


    for (let i = 0; i < TAMLabels.length; i++) {
        TAMLabel[i].value = TAMLabels[i];
    }
    for (let i = 0; i < TAMinputs.length; i++) {
        TAMinput[i].value = TAMinputs[i];
    }
}


function success() {
    Swal.fire({
        title: 'Success',
        icon: 'success'
    })
}
function error(title) {
    Swal.fire({
        title: title,
        icon: 'success'
    })
}

function filtercomma(myArray) {
    toRemove = [,]
    myArray = myArray.filter(function (el) {
        return toRemove.indexOf(el) < 0;
    });
    return myArray
}



function init(img_name) {
    imgObj = document.getElementById(img_name);
    imgObj.classList.add("fade-in");
    imgObj.style.position = 'fixed';
    imgObj.style.clip = "rect(0px 190px 700px 0px)";
    imgObj.style.left = '1%';
}


function built_area() {
    area = document.getElementById('play_area')
    var div = document.createElement("div");
    div.style.width = "97%";
    div.style.height = "700px";
    div.style.position = 'fixed';
    div.style.left = '2%';
    div.style.background = "#FCF5E8";

    div.style.zIndex = "-1";
    area.appendChild(div);
}

function img1() {
    const element2 = document.getElementById("mg2");
    element2.classList.add("fade-in-active");
    element2.remove();
    const element3 = document.getElementById("mg3");
    element3.classList.add("fade-in-active");
    element3.remove();
    const element4 = document.getElementById("mg4");
    element4.remove();
    init('mg1')
    built_area()


}



function img2() {
    const element2 = document.getElementById("mg1");
    element2.remove();
    const element3 = document.getElementById("mg3");
    element3.remove();
    const element4 = document.getElementById("mg4");
    element4.remove();
    init('mg2')
    built_area()
}


function img3() {
    const element2 = document.getElementById("mg2");
    element2.remove();
    const element3 = document.getElementById("mg1");
    element3.remove();
    const element4 = document.getElementById("mg4");
    element4.remove();
    init('mg3')
    built_area()
}


function img4() {
    const element2 = document.getElementById("mg2");
    element2.remove();
    const element3 = document.getElementById("mg3");
    element3.remove();
    const element4 = document.getElementById("mg1");
    element4.remove();
    init('mg4')
    built_area()
}
