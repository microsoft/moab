import '../scss/app.scss';
import Sketchfab from './sketchfab-viewer-1.7.1';
import './jquery-global';
import fancyBox from './../node_modules/@fancyapps/fancybox/dist/jquery.fancybox';

document.querySelector(".hamburger").addEventListener('click', function () {
  document.querySelector("nav > ul").classList.toggle("active");
});

(function () {
  // Sketchfab
  var iframe = document.getElementById( 'api-frame' );
  if (iframe) {
    var uid = 'aa056783e78445f19182dad31d99935f';
    var client = new Sketchfab( iframe );
    client.init( uid, {
      transparent: 1,
      ui_controls: 0,
      ui_infos: 0,
      success: function onSuccess( api ){
        api.start(function () {
          // Handles the buttons outside of sketchfab
          var buttons = document.getElementsByClassName('sketchfab-button'); 
          for (let button of buttons) {
            button.addEventListener('click', function (e) {
              e.preventDefault();
              api.gotoAnnotation(button.getAttribute('annotation'), {});
              for(let b of buttons) {
                b.classList.remove('active');
              }
              button.classList.toggle('active');
            });
          }
        });
      }
    });
  }

  //moab viewer
  var buttons = document.getElementsByClassName('viewer-button');
  var imgs = document.getElementsByClassName('moab-viewer-image');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', function (e) {
      document.querySelector('.viewer-button.active').classList.remove('active');
      document.querySelector('.moab-viewer-image.active').classList.remove('active');
      e.target.classList.add('active');
      imgs[i].classList.add('active');
    });
  }

  //expand content
  var expandButtons = document.querySelectorAll('.expand-button');
  for (let button of expandButtons) {
    button.addEventListener('click', function (e) {
      if (e && e.target) {
        var parent = e.target.closest('.section');
        var button = e.target;
        var right = parent.querySelector('.right');
        right.classList.toggle('expand');
        button.classList.toggle('expand-button')
        button.classList.toggle('close-button')
      }
    });
  }

  //expand content on url pound
  var hash = window.location.hash;
  if (hash) {
    var expand = document.getElementById(window.location.hash.split('#')[1]);
    if (expand) {
      expand.querySelector('.expand-button').click();
    }
  }

})();
