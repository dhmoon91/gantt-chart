// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require lodash
//= require jquery
//= require jquery_ujs
//= require jquery.ui.all
//= require react
//= require react_ujs
//= require interactjs
//= require moment
//= require components
//= require_tree .

// target elements with the "draggable" class
// interact('.draggable')
//   .draggable({
//     // enable inertial throwing
//     inertia: true,
//     // keep the element within the area of it's parent
//     restrict: {
//       restriction: "parent",
//       endOnly: true,
//       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
//     },
//     // enable autoScroll
//     autoScroll: true,
//
//     // call this function on every dragmove event
//     onmove: dragMoveListener,
//     // call this function on every dragend event
//     onend: function (event) {
//       var textEl = event.target.querySelector('p');
//
//       textEl && (textEl.textContent =
//         'moved a distance of '
//         + (Math.sqrt(event.dx * event.dx +
//                      event.dy * event.dy)|0) + 'px');
//     }
//   });
//
//   function dragMoveListener (event) {
//     var target = event.target,
//         // keep the dragged position in the data-x/data-y attributes
//         x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
//         y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
//
//     // translate the element
//     target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)';
//
//     // update the posiion attributes
//     target.setAttribute('data-x', x);
//     target.setAttribute('data-y', y);
//   }
//
//   // this is used later in the resizing and gesture demos
//   window.dragMoveListener = dragMoveListener;
// $(function() {
//  $("#datepicker").datepicker();
//  });
//
//  $(function() {
//   $("#draggable").draggable();
// });

interact('.resize-drag')
  .draggable({
    onmove: window.dragMoveListener
  })
  .resizable({
    preserveAspectRatio: true,
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
  });

  var element = document.getElementById('grid-snap'),
    x = 0, y = 0;
//
// interact(element)
//   .draggable({
//     snap: {
//       targets: [
//         interact.createSnapGrid({ x: 30, y: 30 })
//       ],
//       range: Infinity,
//       relativePoints: [ { x: 0, y: 0 } ]
//     },
//     inertia: true,
//     restrict: {
//       restriction: element.parentNode,
//       elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
//       endOnly: true
//     }
//   })
//   .on('dragmove', function (event) {
//     x += event.dx;
//     y += event.dy;
//
//     event.target.style.webkitTransform =
//     event.target.style.transform =
//         'translate(' + x + 'px, ' + y + 'px)';
//   });
