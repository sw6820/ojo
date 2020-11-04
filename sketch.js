// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */
//

'use strict';
// var myPlayer = videojs("my-video");
// var promise = new Promise(reseolve, reject) => {
//
// }



var options = {};

var myPlayer = videojs('my-video', options, function onPlayerReady() {

  // videojs.log('Your player is ready!');

  // In this context, `this` is the player that was created by Video.js.
  this.play();

  // How about an event listener?
  // this.on('ended', function() {
  //  this.draw()
  // });
});

// Global variable to store the classifier
let classifier;

// Label (start by showing listening)
let label = "listening";

// Teachable Machine model URL:
let soundModelURL = 'https://sw6820.github.io/ojo/model.json';

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}

function setup() {
  createCanvas(640, 480);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}



// var getVideoData = function () {
//   return new Promise(function (resolve, reject) {
//     var videoData = [
//       {"idx": 1, "src": "https://vjs.zencdn.net/v/oceans.mp4"}, //"poster": "https://cdn2-www.dogtime.com/assets/uploads/2018/11/dogs-fall-season-pictures-1.jpg", "isCheck": false, "tit": "Introduction", "time": 0},
//       {"idx": 2, "src": "https://vjs.zencdn.net/v/oceans.mp4"}, //"poster": "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12234558/Chinook-On-White-03.jpg", "isCheck": false, "tit": "Introduction", "time": 0},
//       {"idx": 3, "src": "https://vjs.zencdn.net/v/oceans.mp4"}, //"poster": "https://www.rspcansw.org.au/wp-content/uploads/2017/08/50_a-feature_dogs-and-puppies_mobile.jpg", "isCheck": false, "tit": "Introduction", "time": 0},
//       {"idx": 4, "src": "https://vjs.zencdn.net/v/oceans.mp4"}, //"poster": "https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg", "isCheck": false, "tit": "Introduction", "time": 0},
//
//
//     ]
//     resolve(videoData);
//   })
// }
// getVideoData()
//     .then(function (res) {
//       var videoArr = res,
//           vid = document.querySelector('#my-video'),
//           currentNum = 0,
//           maxNum = res.length,
//           videoListData = {
//             text: videoArr,
//           };
//
//       var player = videojs(vid, {
//         inactivityTimeout: 0
//       });
//
//       //현재 받은 비디오데이터의 맨처음 list 재생준비
//       player.poster(videoArr[0].poster);
//       player.src(videoArr[0].src);
//       $(".video__tit").text(videoArr[0].idx + ". " + videoArr[0].tit);
//
//
//       var videoList = new HandleBars(videoListData, '#video__total-template', '.video__menu');
//       videoList.render();
//
//       var listItem = $('.video__items');
//       listItem.eq(0).addClass('active');
//       listClick(listItem);
//
//
//
//       player.on('play', function () {
//         //동영상 플레이 감지
//
//         //console.log(videoListData.text[currentNum].time)
//
//
//
//       });
// }


function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
  // myPlayer.src("C:\\Users\\5320shin\\WebstormProjects\\untitled\\ojo\\video\\angry_cat.mp4")
  // myPlayer.play();
  // console.log('play');
  // $<
  // change src
  // play video? > angry > play
  // myPlayer.src = "https://sw6820.github.io/ojo/video/angry_cat.mp4";
  // myPlayer.play();
  // if (!myPlayer.ended){

  //   if (label.includes('angry')) {status = "angry";}
  //   else if(label.includes('happy')) {status = "happy";}
  //   else if(label.includes('sick')) {status = "sick";}
  //   else if(label.includes('trill')) {status = "trill";}
  //   else { return; }
  //     //change angry src -> play -> else -> change video -> check if play ->
  //   myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/" + status + "_cat.mp4");
  //   myPlayer.play();
  //   console.log('play');
  // myPlayer.on('ended',)
  // if (!myPlayer.ended){
  //   var stat = "happy";
  //   // myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/" + stat + "_cat.mp4");
  //   // myPlayer.src("C:\\Users\\5320shin\\WebstormProjects\\untitled\\ojo\\video\\angry_cat.mp4")
  //   myPlayer.play();

  // }
  // else {console.log('not play');}

//  myPlayer.on('ended', function(){
//    var status = "noise";
//    if (label.includes('angry')) {status = "angry";}
//    else if(label.includes('happy')) {status = "happy";}
//    else if(label.includes('sick')) {status = "sick";}
//    else if(label.includes('trill')) {status = "trill";}
//    else { return; }
//    myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/" + status + "_cat.mp4");
//    myPlayer.play();
//  })


}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  //label = results[0].label;

  // if (nf(results[0].confidence, 0, 2) > 0.8)
    // label = results[0].label;
  label = results[0].label + ' ' + nf(results[0].confidence, 0, 2);

  if(results[0].confidence > 0.8) {

    myPlayer.on('ended', function() {
      is_playing = false;
    });
    if (!is_playing) {
      var status = results[0].label
      if (status == "noise") return;
      myPlayer.src({src: "http://sw6820.github.io/ojo/video/" + status + "_cat.mp4", type: "video/mp4"});
      console.log(status);
      is_playing = true;
      myPlayer.play();
      // console.print('play');

    }
  }
}

var is_playing = false;
