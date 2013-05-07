function forEachProcessItem(cb) {
  var list = document.getElementById('process-list');
  var items = list.getElementsByTagName('li');
  Array.prototype.forEach.call(items, cb);
}

function forEachInspectorFrame(cb) {
  var iframes = document
    .getElementById('inspector')
    .getElementsByTagName('iframe');

  Array.prototype.forEach.call(iframes, cb);
}

function getId(itemOrFrame) {
  return itemOrFrame.getAttribute('data-id');
}
function selectFrame(id) {
  forEachInspectorFrame(function (it) {
    if (getId(it) == id) {
      it.style.visibility = 'visible';
      it.contentWindow.focus();
    } else {
      it.style.visibility = 'hidden';
    }
  });

  forEachProcessItem(function (it) {
    if (getId(it) == id)
      it.classList.add('selected');
    else
      it.classList.remove('selected');
  });
}

function onDocumentLoaded() {
  forEachProcessItem(function (it) {
    it.addEventListener('click', function () {
      selectFrame(getId(this));
    });
  });

  window.removeEventListener("DOMContentLoaded", onDocumentLoaded, false);
}

window.addEventListener('DOMContentLoaded', onDocumentLoaded);