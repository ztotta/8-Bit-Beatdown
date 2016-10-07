////d 
//document.write('<script type="text/javascript" src="../wad/build/wad.min.js"></script>');

console.log("wad-script loaded");

var bpm = 100
var beat = 60 / bpm 

// Amber stem loop build:
//var amberOohAah = new Wad({source : '../wad/GUI/audio/amber-oohaah-stem.mp3', volume: .25, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberKit = new Wad({source : '../wad/GUI/audio/amber-kit-stem.mp3', volume: .9, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberBass = new Wad({source : '../wad/GUI/audio/amber-bass-stem.mp3', volume: .3, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberPiano = new Wad({source : '../wad/GUI/audio/amber-piano-stem.mp3', volume: .7, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberGuitarL = new Wad({source : '../wad/GUI/audio/amber-guitarl-stem.mp3', volume: .3, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberGuitarR = new Wad({source : '../wad/GUI/audio/amber-guitarr-stem.mp3', volume: .3, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberLVox = new Wad({source : '../wad/GUI/audio/amber-lvox-stem.mp3', volume: .8, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberBVox = new Wad({source : '../wad/GUI/audio/amber-bvox-stem.mp3', volume: .3, env: {attack: 0.01, decay: 5000, sustain: 1}})
//var amberOriginal = new Wad({source : '../wad/GUI/audio/amber-original-stem.mp3', env: {attack: 0.01, decay: 5000, sustain: 1}})
//
//var amberBand = function() {
//    amberOohAah.play();
//    amberKit.play();
//    amberBass.play();
//    amberPiano.play();
//    amberGuitarL.play();
//    amberGuitarR.play();
//    amberLVox.play(); 
//    amberBVox.play();
//};

//var amberSong = new Wad({source : '../wad/GUI/audio/amber-wad.mp3', env: {attack: 0.01, decay: 5000, sustain: 1}})

//// The following section is my first loop experimentation: 

var kick = new Wad({source : 'assets/kick.mp3'})
kick.globalReverb = false

var bass = new Wad({
    source : 'sine',
    volume : .9,
    globalReverb : false,
    env : {
        attack : .02,
        decay : .1,
        sustain : .3,
        hold : .4,
        release : .1
    }
})

var piano = new Wad({source : 'square', volume : 1.4, env : {attack : .5, decay : .005, sustain : .2, hold : .015, release : .3}, filter : {type : 'lowpass', frequency : 1200, q : 8.5, env : {attack : .2, frequency : 600}}})
piano.globalReverb = true

var hat = new Wad(Wad.presets.hiHatClosed)
hat.globalReverb = false
var snare = new Wad(Wad.presets.snare)
snare.globalReverb = false
var hatOpen = new Wad(Wad.presets.hiHatOpen)
hatOpen.globalReverb = false
var ghost = new Wad(Wad.presets.ghost)
Wad.setGlobalReverb({impulse : 'assets/widehall.wav', wet : .5})
snare.setVolume(9)
//var amberSong = new Wad({source : '../wad/GUI/audio/amber-wad.mp3', env: {attack: 0.01, decay: 5000, sustain: 1}})
//amberSong.globalReverb = false


// kitLoop1 build:
var kickLoop1 = function() {
    kick.play({wait : beat*0})
    kick.play({wait : beat*2})
    kick.play({wait : beat*4})
    kick.play({wait : beat*6})
};

var hatLoop1 = function() {
    hat.play({wait : beat * 0.5})
    hat.play({wait : beat * 1.5})
    hat.play({wait : beat * 2.5})
    hatOpen.play({wait : beat * 3.5, panning : .1})
    hat.play({wait : beat * 4.5})
    hat.play({wait : beat * 5.5})
    hat.play({wait : beat * 6.5})
    hatOpen.play({wait : beat * 7.5, panning : -.1})
};

var snareLoop1 = function() {
    snare.play({wait : beat * 1})
    snare.play({wait : beat * 3})
    snare.play({wait : beat * 5})
    snare.play({wait : beat * 7})
};

var kitLoop1 = function() {
    kickLoop1();
    hatLoop1();
    snareLoop1();
}

// instrLoop1 build:
var bassLoop1 = function () {
    bass.play({ pitch : 'A2',   wait : beat * 0})
    bass.play({ pitch : 'A2',   wait : beat * .5})
    bass.play({ pitch : 'A2',   wait : beat * 1})
    bass.play({ pitch : 'A2',   wait : beat * 1.5})
    bass.play({ pitch : 'A2',   wait : beat * 2})
    bass.play({ pitch : 'A2',   wait : beat * 2.5})
    bass.play({ pitch : 'G2',   wait : beat * 3})
    bass.play({ pitch : 'C2',   wait : beat * 3.5})
    bass.play({ pitch : 'A2',   wait : beat * 4})
    bass.play({ pitch : 'A2',  wait : beat * 4.5})
    bass.play({ pitch : 'A2',  wait : beat * 5})
    bass.play({ pitch : 'A2',  wait : beat * 5.5})
    bass.play({ pitch : 'A2',  wait : beat * 6})
    bass.play({ pitch : 'A2',  wait : beat * 6.5})
    bass.play({ pitch : 'G2',  wait : beat * 7})
    bass.play({ pitch : 'G2',  wait : beat * 7.5})
};

var pianoLoop1 = function() {
    piano.play( {pitch : 'A4', wait : beat * (0)})
    piano.play( {pitch : 'A4', wait : beat * (1)})
    piano.play( {pitch : 'A4', wait : beat * (2), filter : { q : 15}})
    piano.play( {pitch : 'G4', wait : beat * (3)})
    piano.play( {pitch : 'A4', wait : beat * (4), env : {release : .2}})
    piano.play( {pitch : 'A4', wait : beat * (5), filter : { q : 15}})
    piano.play( {pitch : 'A4', wait : beat * (6)})
    piano.play( {pitch : 'G5', wait : beat * (7), env : {release : .2}})
};
    
var instrLoop1 = function () {
    bassLoop1();
    fluteLoop1();
    pianoLoop1();
};

// bandLoop1 build:
var bandLoop1 = function(){
    instrLoop1();
    kitLoop1();
};

/////////////////////////////////////////////////////////////////////////////////

//// beneath this line is all example stuff
//
//var oneLoop = function() {
//    if ($('#hihats').hasClass('on')){
//        hat.play({wait : beat * 0.5})
//        hat.play({wait : beat * 1.5})
//        hat.play({wait : beat * 2.5})
//        hat.play({wait : beat * 3.0})
//        hatOpen.play({wait : beat * 3.5, panning : .1})
//        hat.play({wait : beat * 4.5})
//        hat.play({wait : beat * 5.5})
//        hat.play({wait : beat * 6.5})
//        hat.play({wait : beat * 7.0})
//        hatOpen.play({wait : beat * 7.5, panning : -.1})
//
//
//        hat.play({wait : beat * (0.5 + 8)})
//        hat.play({wait : beat * (1.5 + 8)})
//        hat.play({wait : beat * (2.5 + 8)})
//        hat.play({wait : beat * (3.0 + 8)})
//        hatOpen.play({wait : beat * (3.5 + 8), panning : .1})
//        hat.play({wait : beat * (4.5 + 8)})
//        hat.play({wait : beat * (5.5 + 8)})
//        hat.play({wait : beat * (6.5 + 8)})
//        hat.play({wait : beat * (7.0 + 8)})
//
//    }
//
//    if ($('#snare').hasClass('on')){
//
//        snare.play({wait : beat * 1})
//        snare.play({wait : beat * 2.25})
//        snare.play({wait : beat * 3})
//        snare.play({wait : beat * 5})
//        snare.play({wait : beat * 6.25})
//        snare.play({wait : beat * 7})
//
//        snare.play({wait : beat * (1 + 8)})
//        snare.play({wait : beat * (2.25 + 8)})
//        snare.play({wait : beat * (3 + 8)})
//        snare.play({wait : beat * (5 + 8)})
//        snare.play({wait : beat * (6.25 + 8)})
//        snare.play({wait : beat * (7 + 8)})
//
//
//    }
//
//    if ($('#kick').hasClass('on')){
//        kick.play({wait : beat*0})
//        kick.play({wait : beat*2})
//        kick.play({wait : beat*4})
//        // kick.play({wait : beat*4.5})
//        kick.play({wait : beat*6})
//        // kick.play({wait : beat*7})
//        // kick.play({wait : beat*7.5})
//        kick.play({wait : beat*(0+8)})
//        kick.play({wait : beat*(2+8)})
//        kick.play({wait : beat*(4+8)})
//        // kick.play({wait : beat*(4.5+8)})
//        kick.play({wait : beat*(6+8)})
//        // kick.play({wait : beat*(7+8)})
//        kick.play({wait : beat*(7.5+8)})
//
//    }
//
//
//
//
//    if ($('#bass').hasClass('on')){
//        bass.play({ pitch : 'C2',   wait : beat * 0})
//        bass.play({ pitch : 'C3',   wait : beat * .5})
//        bass.play({ pitch : 'C2',   wait : beat * 1})
//        bass.play({ pitch : 'C3',   wait : beat * 1.5})
//        bass.play({ pitch : 'C2',   wait : beat * 2})
//        bass.play({ pitch : 'C3',   wait : beat * 2.5})
//        bass.play({ pitch : 'C2',   wait : beat * 3})
//        bass.play({ pitch : 'C3',   wait : beat * 3.5})
//        bass.play({ pitch : 'F2',   wait : beat * 4})
//        bass.play({ pitch : 'F3',  wait : beat * 4.5})
//        bass.play({ pitch : 'F2',  wait : beat * 5})
//        bass.play({ pitch : 'F3',  wait : beat * 5.5})
//        bass.play({ pitch : 'F2',  wait : beat * 6})
//        bass.play({ pitch : 'F3',  wait : beat * 6.5})
//        bass.play({ pitch : 'F2',  wait : beat * 7})
//        bass.play({ pitch : 'F3',  wait : beat * 7.5})
//        bass.play({ pitch : 'Ab2', wait : beat * 8})
//        bass.play({ pitch : 'Ab3', wait : beat * 8.5})
//        bass.play({ pitch : 'Ab2', wait : beat * 9})
//        bass.play({ pitch : 'Ab3', wait : beat * 9.5})
//        bass.play({ pitch : 'Ab2', wait : beat * 10})
//        bass.play({ pitch : 'Ab3', wait : beat * 10.5})
//        bass.play({ pitch : 'Ab2', wait : beat * 11})
//        bass.play({ pitch : 'Ab3', wait : beat * 11.5})
//        bass.play({ pitch : 'G2',  wait : beat * 12})
//        bass.play({ pitch : 'G3',  wait : beat * 12.5})
//        bass.play({ pitch : 'G2',  wait : beat * 13})
//        bass.play({ pitch : 'G3',  wait : beat * 13.5})
//        bass.play({ pitch : 'G2',  wait : beat * 14})
//        bass.play({ pitch : 'G3',  wait : beat * 14.5})
//        bass.play({ pitch : 'G2',  wait : beat * 15})
//        bass.play({ pitch : 'Bb2', wait : beat * 15.5})
//
//        
//    }
//
//    if ($('#piano').hasClass('on')){
//        piano.play( {pitch : 'C5', wait : beat * (0.75)})
//        piano.play( {pitch : 'Eb5', wait : beat * (1), filter : { q : 15}})
//        piano.play( {pitch : 'C5', wait : beat * (1.5)})
//        piano.play( {pitch : 'F5', wait : beat * (1.75 ), env : {release : .2}})
//
//        piano.play( {pitch : 'C5', wait : beat * (4.75)})
//        piano.play( {pitch : 'Eb5', wait : beat * (5), filter : { q : 15}})
//        piano.play( {pitch : 'C5', wait : beat * (5.5)})
//        piano.play( {pitch : 'F5', wait : beat * (5.75), env : {release : .2}})
//
//        piano.play( {pitch : 'C5', wait : beat * (8.75)})
//        piano.play( {pitch : 'Eb5', wait : beat * (9), filter : { q : 15}})
//        piano.play( {pitch : 'C5', wait : beat * (9.5)})
//        piano.play( {pitch : 'F5', wait : beat * (9.75), env : {release : .2}})
//
//        piano.play( {pitch : 'C5', wait : beat * (12.75)})
//        piano.play( {pitch : 'Eb5', wait : beat * (13), filter : { q : 15}})
//        piano.play( {pitch : 'C5', wait : beat * (14.75)})
//        piano.play( {pitch : 'Eb5', wait : beat * (15)})
//        piano.play( {pitch : 'G5', wait : beat * (15.5), filter : { q : 15}})
//
//    }
//
//
//    if ($('#flute').hasClass('on')){
//        ghost.play( {pitch : 'G5', wait : beat * (0), panning : -.1})
//        ghost.play( {pitch : 'Gb5', wait : beat * (3.75), panning : -.1, env : {hold :.1}})
//        ghost.play( {pitch : 'F5', wait : beat * (4), panning : .1})
//        ghost.play( {pitch : 'Ab5', wait : beat * (8), panning : -.1})
//        ghost.play( {pitch : 'G5', wait : beat * (11), panning : .1})
//        ghost.play( {pitch : 'Bb5', wait : beat * (12), panning : .1})
//        // ghost.play( {pitch : 'Eb5', wait : beat * (13), env : {hold : .1}})
//        
//    }
//
//}
//
