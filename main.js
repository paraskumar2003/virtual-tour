const app = {
    items: {
        "82 Dalgarno Gardens": {
            time: 0,
        },
        "Hallway": {
            points: [
                "Downlights through hallway",
                "Stunning Victorian Flooring"
            ],
            time: 13,
        },
        "Living Space": {
            points: [
                "Ample Space",
                "Natural light for long-hours through double aspect roof ",
            ],
            time: 22,
        },
        "Kitchen": {
            points: [
                "Black Granite Work Surface",
                "Kitchen Bar",
                "Island with a sink",
            ],
            time: 44,
        },
        "Garden": {
            points: [
                "South-facing",
                "34 Sq.ft. Garden",
                "Large Patio",
            ],
            time: 66,
        },
        "Downstairs": {
            points: [
                "Ample Space",
                "Natural light all-round",
            ],
            time: 79,
        },
        "Guest Bedroom": {
            points: [
                "Double-bed",
                "European Upholstery",
            ],
            time: 114,
        },
        "Office": {
            points: [
                "Perfect for Work-From-Home",
                "Can be used as a small double room ",
            ],
            time: 133,
        },
        "Master Bedroom": {
            points: [
                "King-sized",
                "En-suite Shower Room and W/C",
                "Built-in floor to ceiling wardrobes",

            ],
            time: 145,
        },
        "Upstairs Bathroom": {
            points: [
                "Large Modern Tiles",
                "Good-sized, Shower bath",
            ],
            time: 179,
        },
        "Guest Bedroom Two": {
            points: [
                "Designed to have abundance light",
                "Well-portioned, Built-in storage",
            ],
            time: 203,
        },
        "Quaker Estate": {
            time: 235,
        }
    },

    current_item: "",
}

const main_vid_player = document.getElementById("main_video_player");
const orien_error = document.getElementById("orien_error");

const main_vid = document.querySelector("#main_video_player video")
const living_item = document.querySelector(".living-item-cover");
const title_head = document.querySelector(".living-content h3");
const points_list = document.querySelector(".living-content .points-list");
const image = document.querySelector(".living-content img");
const sidebar_list = document.querySelector('.sidebar ul');
const open_item_btn = document.querySelector('.open-item-btn');

// methods called by html
function open_item() {

    if (app.current_item == "82 Dalgarno Gardens" || app.current_item == "Quaker Estate") {
        document.getElementById(app.current_item.replaceAll(" ", "_")).style.display = 'initial';
    } else {
        title_head.textContent = app.current_item;
        points_list.innerHTML = "";
        app.items[app.current_item].points.forEach(pt => {
            points_list.insertAdjacentHTML('beforeend', `<li>${pt}</li>`);
        })

        image.src = `Images/${app.current_item}.png`;

        living_item.style.display = 'flex';
    }

    main_vid.pause();
}

function close_item() {
    if (app.current_item == "82 Dalgarno Gardens" || app.current_item == "Quaker Estate") {
        document.getElementById(app.current_item.replaceAll(" ", "_")).style.display = 'none';
    } else {
        living_item.style.display = 'none';
    }
    main_vid.play();
}

function main_video_running(vid) {
    let cTime = vid.currentTime;

    if (cTime >= 0 && cTime < 13) {
        app.current_item = "82 Dalgarno Gardens";
    } else if (cTime >= 13 && cTime < 22) {
        app.current_item = "Hallway";
    } else if (cTime >= 22 && cTime < 44) {
        app.current_item = "Living Space"
    } else if (cTime >= 44 && cTime < 66) {
        app.current_item = "Kitchen";
    } else if (cTime >= 66 && cTime < 79) {
        app.current_item = "Garden";
    } else if (cTime >= 79 && cTime < 114) {
        app.current_item = "Downstairs";
    } else if (cTime >= 114 && cTime < 133) {
        app.current_item = "Guest Bedroom";
    } else if (cTime >= 133 && cTime < 145) {
        app.current_item = "Office";
    } else if (cTime >= 145 && cTime < 179) {
        app.current_item = "Master Bedroom";
    } else if (cTime >= 179 && cTime < 203) {
        app.current_item = "Upstairs Bathroom";
    } else if (cTime >= 203 && cTime < vid.duration) {
        app.current_item = "Guest Bedroom Two";
    } else if (cTime >= vid.duration) {
        app.current_item = "Quaker Estate";
    }

    open_item_btn.textContent = app.current_item;

}

function shift_vid_time(item) {
    main_vid.currentTime = app.items[item].time;
}

function portrait_setting(){
    main_vid.pause();
    main_vid_player.style.display = 'none';
    orien_error.style.display = 'initial';
}
function landscape_setting(){
    main_vid.play();
    main_vid_player.style.display = 'flex';
    orien_error.style.display = 'none';
}


window.addEventListener('load', function () {

    Object.keys(app.items).forEach(item => {
        sidebar_list.insertAdjacentHTML('beforeend', `<li onclick="shift_vid_time('${item}')">
                                            <p>${item}</p>
                                        </li>`)
    })

    let agent = this.navigator.userAgent.toLowerCase();
    if (agent.includes('android') || agent.includes('iphone')){
        
        let ort = this.window.screen.orientation.type;
        if (ort.includes('portrait')){
            portrait_setting();
        }
        
    }
})


// window.screen.orientation.addEventListener('change', function(){
//     if (window.screen.orientation.type.includes('landscape')){
//         // run on phone
//         landscape_setting();
//     }else{
//         portrait_setting();
//     }
// })