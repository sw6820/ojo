// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

'use strict';

var options = {};

var myPlayer = videojs('my-video', options, function onPlayerReady() {

  // In this context, `this` is the player that was created by Video.js.
  this.play();
});

myPlayer.on("resize", function() {
  console.log('resize');
});
// Global variable to store the classifier
var classifier;
var is_playing = false;
// Label (start by showing listening)
var label = "listening";

// Teachable Machine model URL:
var soundModelURL = 'https://sw6820.github.io/ojo/model.json';

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}

function setup() {
  createCanvas(100, 32);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
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
    }
  }
}


