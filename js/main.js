//// new for project 10/5/16
//// Mary Rose Cook livecoding
console.log("main js loaded")
//
var bpm = 95; 
var beat = 160 / bpm;
var loopMs = beat * 1000 * 4;
var looper = true;

//// create instruments for each sound. WORKING
var kick = new Wad({source: 'assets/kickEdit.mp3'});
var snare = new Wad(Wad.presets.snare); 
    snare.setVolume(9)
var hiHatC = new Wad(Wad.presets.hiHatClosed);
var hiHatOp = new Wad(Wad.presets.hiHatOpen);
//var computerLoopEasy = new Wad({source: 'assets/computerLoopEasy.mp3'});
var computerLoopEasy = new Wad({
    source : 'assets/computerLoopEasy.mp3',
    env : { attack : 0, decay : 10000, sustain : 1, hold : 1, release : 1 }})
////var applause = new Wad {}
////var computerMocking = new Wad {}
////var computerCongrats = new Wad {}

//// create 64 booleans for each instrument. WORKING
var kickBool = [];
for (var i=0; i<64; i++) { kickBool.push(false) }

var snareBool = [];
for (var i=0; i<64; i++) { snareBool.push(false) }

var hiHatCBool = [];
for (var i=0; i<64; i++) { hiHatCBool.push(false)}

var hiHatOpBool = [];
for (var i=0; i<64; i++) { hiHatOpBool.push(false) }

//// assign id's and text to each step. WORKING
function stepIdMaker () {
    for (var i=0; i<= 63; i++) {
        $('.kickSteps').eq(i).attr('id', '#kick' + i).text(i);
    }
    for (var i=0; i<= 63; i++) {
        $('.snareSteps').eq(i).attr('id', '#snare' + i).text(i); 
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatCSteps').eq(i).attr('id', '#hiHatC' + i).text(i);
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatOpSteps').eq(i).attr('id', '#hiHatOp' + i).text(i);
    }
}
stepIdMaker();

//// assign unique class to quarter notes to clarify the grid
function quarterNoteMaker () {
    for (var i=0; i<= 63; i+=4) {
        $('.kickSteps').eq(i).addClass('quarterNote');
    }
    for (var i=0; i<= 63; i+=4) {
        $('.snareSteps').eq(i).addClass('quarterNote')
    }
    for (var i=0; i<= 63; i+=4) {
        $('.hiHatCSteps').eq(i).addClass('quarterNote')
    }
    for (var i=0; i<= 63; i+=4) {
        $('.hiHatOpSteps').eq(i).addClass('quarterNote')
    }
}
quarterNoteMaker();

//// add click listener to steps and toggle boolean values WORKING
//// make step light up when selected (toggle class) WORKING
$('.kickSteps, .snareSteps, .hiHatCSteps, .hiHatOpSteps').click(function(event) {
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#kick' + i) {
            if (kickBool[i] === false) { kickBool[i] = true; $(event.target).addClass('litSteps') }
            else { kickBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#snare' + i) {
            if (snareBool[i] === false) { snareBool[i] = true; $(event.target).addClass('litSteps') }
            else { snareBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatC' + i) {
            if (hiHatCBool[i] === false) { hiHatCBool[i] = true; $(event.target).addClass('litSteps') }
            else { hiHatCBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatOp' + i) {
            if (hiHatOpBool[i] === false) { hiHatOpBool[i] = true; $(event.target).addClass('litSteps') }
            else { hiHatOpBool[i] = false; $(event.target).removeClass('litSteps') }  
        }
    }
})

//// build empty loops for each instrument WORKING
function kickLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (kickBool[i]) { kick.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

function snareLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (snareBool[i]) { snare.play({wait : beat * beatCounter}) }
//        if (!looper) { return } // not stopping immediately
        beatCounter += 0.0625;
    }
}

function hiHatCLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatCBool[i]) { hiHatC.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

function hiHatOpLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatOpBool[i]) { hiHatOp.play({wait : beat * beatCounter}) }
        beatCounter += 0.0625;
    }
}

//// make divs light up with metronome NOT working
//// it makes it through, but affects all 64 divs at same time
function metronome() {
//    var beatCounter = 0;
//    var $kickSteps = $('.kickSteps');
//    function doSetTimeout(i) {
//        setTimeout(function() {
//            $($kickSteps[i]).addClass('metronome');
//        }, 2000);
//    }
//    for (var i=0; i<=63; i++) { doSetTimeout(i) };
    
    // make quarter notes toggle class on beat
    var metronomeMs = beat * 250;
    for (var i=0; i<=63; i++){
        setInterval(function(metInt) {
            console.log('quarterNote setTimeout entered')
//          debugger;
            var $quarterMetronome = $('.quarterNote').eq(i);
            $quarterMetronome.addClass('metronome');
        }, metronomeMs);
        metronomeMs += 2000; 
    }
}

//// call computer's beat
//// connect 'click' to #playComputerLoop
//// make computer taunt after user hears it's beat
$('#startComputerLoop').click(function() { computerLoopEasy.play(); console.log('play dammit!') })

//// call all loops on WORKING
//// stop loops immediately NOT working
function startLoops() {
//    if (!looper) { return } 
    kickLoop();
    snareLoop();
    hiHatCLoop();
    hiHatOpLoop();
    //// launch metronome sequencer at same time
//    metronome(); 
    //// setInteral relaunches at intervals of 1 loop WORKING
    setInterval(function(loopInt) {
      if (!looper) { clearInterval(loopInt); return } 
    //// doesn't stop immediately...
    //// stop loop with looper = false, BUT
    //// start with startLoops() so it starts at the bottom
    //// and doesn't keep the old loop
      console.log('setIntervalz entered after if')
      snareLoop();
      kickLoop();
      hiHatCLoop();
      hiHatOpLoop();
      //// launch metronome sequencer at same time
//      metronome();
    }, loopMs)
}

//// currently after pausing and then playing the beat again,
//// it launches but then launches another loop shortly after

//// toggle b/t "play" and "pause" User beat (text and action)
$('#toggleUserLoop').click(function(e) {
    if (e.target.innerHTML === "play_your_wanna-beat") { e.target.innerHTML = "pause_your_wanna-beat";
    startLoops(); looper = true }
    else { e.target.innerHTML = "play_your_wanna-beat"; 
    looper = false }
    
})



//// check for victory (all step var's match the key's bool values)
//function winCheck() {
//    if (kickBool[0] && !kickBool[1] && !kickBool[2] && !kickBool[3] && !kickBool[4] && !kickBool[5] && !kickBool[6] && !kickBool[7] && !kickBool[8] && !kickBool[9] && !kickBool[10] && !kickBool[11] && !kickBool[12] && !kickBool[13] && !kickBool[14] && !kickBool[15] && kickBool[16] && !kickBool[17] && !kickBool[18] && !kickBool[19] && !kickBool[20] && !kickBool[21] && !kickBool[22] && !kickBool[23] && !kickBool[24] &!kickBool[25] && !kickBool[26] && !kickBool[27] && !kickBool[28] && !kickBool[29] && !kickBool[30] && !kickBool[31] && kickBool[32] && !kickBool[33] && !kickBool[34] && !kickBool[18] && !kickBool[19] && !kickBool[20] && !kickBool[21] && !kickBool[22] && !kickBool[23] && !kickBool[24] &!kickBool[25] && !kickBool[26] && !kickBool[27] && !kickBool[28] && !kickBool[29] && !kickBool[30] && !kickBool[31] && kickBool[32] && !kickBool[33] && !kickBool[34]) {
//        if (snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[] && snareBool[]) {
//            if (hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[] && hiHatCBool[]) {
//                if (hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[] && hiHatOpBool[]) {
//                    console.log('User victoryyyyyy!!!')
//                };
//            };
//        };
//    };
//}

//// starting at kickBool[35] false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false

//// BEATS:
//// MEASURE 1: 00 01 02 03 | 04 05 06 07 | 08 09 10 11 | 12 13 14 15
//// MEASURE 2: 16 17 18 19 | 20 21 22 23 | 24 25 26 27 | 28 29 30 31
//// MEASURE 3: 32 33 34 35 | 36 37 38 39 | 40 41 42 43 | 44 45 46 47
//// MEASURE 4: 48 49 50 51 | 52 53 54 55 | 56 57 58 59 | 60 61 62 63