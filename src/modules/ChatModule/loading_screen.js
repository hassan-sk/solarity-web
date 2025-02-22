// var scene_wrapperEl = document.getElementById('scene_wrapper');

// var loading_screenEl = document.getElementById('loading_screen');
// var loading_textEl = document.getElementById('loading_text');
// var loading_barEl = document.getElementById('loading_bar');

var models = [];
var models_number;
var models_loaded = 0;
//builds loading screen when scene is not loaded
export function build_loading_screen() {
  var loading_textEl = document.getElementById("loading_text");
  var loading_barEl = document.getElementById("loading_bar");
  var loading_textEl = document.getElementById("loading_text");
  loading_textEl.innerHTML = "LOADING SCENE";
  var loading_bar_itemEL = document.createElement("div");
  loading_barEl.appendChild(loading_bar_itemEL);
  loading_bar_itemEL.classList.add("moving_item");
}
//updates loading screen based on models actually loaded
function update_loading_screen(setLoaded) {
  var scene_wrapperEl = document.getElementById("scene_wrapper");
  var loading_textEl = document.getElementById("loading_text");
  var loading_barEl = document.getElementById("loading_bar");
  var loading_screenEl = document.getElementById("loading_screen");
  // var loading_videoEl = document.getElementById('background_video');
  setTimeout(function () {
    if (scene_wrapperEl) {
      scene_wrapperEl.removeAttribute("style");
    }
    setLoaded(true);
  }, 20000);
  models_loaded++;
  if (models_loaded == 1) {
    //remove the old bar item when the first model is loaded
    if (!!loading_barEl) loading_barEl.removeChild(loading_barEl.lastChild);
  }
  if (loading_textEl)
    loading_textEl.innerHTML =
      "LOADING MODELS " +
      Math.round((models_loaded * 100) / models_number) +
      " %";
  var loading_bar_itemEL = document.createElement("div");
  if (!!loading_barEl) {
    loading_barEl.appendChild(loading_bar_itemEL);
    loading_bar_itemEL.style.maxWidth = 80 / models_number + "vw";
    loading_bar_itemEL.style.display = "inline-block";
    loading_bar_itemEL.style.height = "14px";
    loading_bar_itemEL.style.backgroundColor = "#AA88FF";
    loading_bar_itemEL.style.width = "auto";
    loading_bar_itemEL.style.display = "flexbox";
    loading_bar_itemEL.style.flexGrow = 1;
    loading_bar_itemEL.style.opacity = 0.6;
  }
  if (models_loaded == models_number) {
    models_loaded = 0;
    models = [];
    models_number = undefined;
    setLoaded(true);
    if (!!scene_wrapperEl) scene_wrapperEl.removeAttribute("style");
    if (!!loading_screenEl) loading_screenEl.style.display = "none";
    // loading_videoEl.remove();
  }
}
//checks if model has loaded before building all of the dinamic content
export function start_loading_screen_listeners(setLoaded) {
  // THREE.Cache.clear();
  models_loaded = 0;
  models = document.getElementsByClassName("model");
  models_number = models.length;
  for (var i = 0; i < models_number; i++) {
    models[i].addEventListener("model-loaded", () => {
      update_loading_screen(setLoaded);
    });
  }
}
