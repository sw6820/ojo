// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */
var myPlayer = videojs("my-video");
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
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
  // $<
  // change src
  // play video? > angry > play
  while (true){
    if (!myPlayer.ended()){
      if (label.includes('angry')){
        myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/angry_cat.mp4");
        //change angry src -> play -> else -> change video -> check if play ->

      } else if(label.includes('happy')){
        myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/happy_cat.mp4");
      } else if(label.includes('sick')){
        myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/sick_cat.mp4");
      } else if(label.includes('trill')){
        myPlayer.src("https://github.com/sw6820/ojo/blob/master/video/trill_cat.mp4");
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
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
  // }
}