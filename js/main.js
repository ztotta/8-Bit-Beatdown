//// new for project 10/5/16
//// Mary Rose Cook livecoding
//// CURRENT BUGS:
//// too easy to retrigger and thus double all clips/loops;
//// after restarting loop, it triggers a 2nd loop
//// "play objectively etc." too big (ruins design flow);
//// CSS is a mess...how to make it responsive and adjustable;
//// metronome visualizer is non-functional but close
//// 

console.log("main js loaded")
//
var bpm = 95; 
var beat = 160 / bpm;
var loopMs = beat * 1000 * 4;
var looper = true;
var victory = false;
var instructions = false;

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
var computerInstructions = new Wad({
    source : 'assets/computerInstructions.mp3',
    env : { attack : 0, decay : 100000, sustain : 1, hold : 1, release : 1 }})
    computerInstructions.setVolume(2.2)
var computerDefeat = new Wad({
    source : 'assets/computerDefeat.mp3',
    env : { attack : 0, decay : 100000, sustain : 1, hold : 1, release : 1 }})
    computerInstructions.setVolume(2.2)
////var computerMocking = new Wad {}


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
        $('.kickSteps').eq(i).attr('id', '#kick' + i);
    }
    for (var i=0; i<= 63; i++) {
        $('.snareSteps').eq(i).attr('id', '#snare' + i); 
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatCSteps').eq(i).attr('id', '#hiHatC' + i);
    }
    for (var i=0; i<= 63; i++) {
        $('.hiHatOpSteps').eq(i).attr('id', '#hiHatOp' + i);
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

//// launch entire kit's loops
function kitLoop() {
    kickLoop();
    snareLoop();
    hiHatCLoop();
    hiHatOpLoop();
//    metronome();
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

//// deliver instructions on click WORKING
//// toggle "Instructions" & "Print" not WORKING
var $instructions = $('#instructions')
var instructionsClickable = true;


    $($instructions).click(function() {
        if (instructionsClickable) { 
            computerInstructions.play(); 
        }; 
        instructionsClickable = false;
        $($instructions).text(`PRINT("this_machine's_got_rhythm")`);
        setTimeout(function() { 
            console.log('setTimeout entered in toggle pause')
            instructions = true; 
            toggleInstructions();
            instructionsClickable = true;
        }, 49000)
    });


if (!instructionsClickable) { }

function toggleInstructions() {
    if (instructions) {
        console.log('instructions if entered')
        $instructions.hover(function() {
            $($instructions).text('#_____Instructions_____#')
        }, function() {
            $($instructions).text(`PRINT("this_machine's_got_rhythm")`)
        });
    }
}

//// pulse color animation while computer is speaking
//// VISUALIZER tutorial 
//// https://airtightinteractive.com/demos/js/reactive/
//$($instructions).click(function() {
//    $('#container').css({backgroundColor:'blue'});
////    $('#container').animate({backgroundColor:'#943D20'}, 100);
//});

//// not sure what this is
//$( "li" ).hover(
//  function() {
//    $( this ).append( $( "<span> ***</span>" ) );
//  }, function() {
//    $( this ).find( "span:last" ).remove();
//  }
//);


//// call computer's beat WORKING
//// connect 'click' to #playComputerLoop WORKING
//// make computer taunt after user hears it's beat NOT yet
$('#startComputerLoop').click(function() { 
    computerLoopEasy.play(); 
    console.log('play dammit!');
})

//// call all loops on WORKING
//// stop loops immediately: NOT working
function startLoops() {
    kitLoop();
    setTimeout(function() { 
      console.log('setTimeout entered in startLoops')
      kitLoop();
    }, loopMs)
}
    //// setInteral relaunches at intervals of 1 loop WORKING
    //// doesn't stop immediately...
    //// stop loop with looper = false, BUT
    //// start with startLoops() so it starts at the bottom
    //// and doesn't keep the old loop
//    setInterval(function(loopInt) {
//      if (!looper) { clearInterval(loopInt); return } 
//      console.log('setIntervalz entered after if')
//      kitLoop();
//    }, loopMs)

//// toggle "play/pause" text WORKING
//// loop toggle NOT working...buggy...almost...
if (!victory) {
    $('#toggleUserLoop').click(function(e) {
        if (e.target.innerHTML === "play_your_wanna_beat") { 
            e.target.innerHTML = "pause_your_wanna_beat";
            startLoops(); looper = true;
            setTimeout(function() { 
                console.log('setTimeout entered in toggle pause')
                e.target.innerHTML = "play_your_wanna_beat"
            }, loopMs * 2)
        }
        else { e.target.innerHTML = "play_your_wanna_beat"; 
        looper = false }  
})}

//// toggle "play_my_wicked_beat" text WORKING
$('#startComputerLoop').click(function(e) {
    e.target.innerHTML = "now_that's_d3rang3d";
    setTimeout(function() { 
        console.log('setTimeout entered in toggle pause')
        e.target.innerHTML = "play_my_wick3d_beat"
    }, loopMs)
})

//// WORKING ////
//// check for victory on every div click (all step var's match the key's bool values) 
$('.kickSteps, .snareSteps, .hiHatCSteps, .hiHatOpSteps').click(winCheck);
function winCheck() {
    if (kickBool[0] && !kickBool[1] && !kickBool[2] && !kickBool[3] && !kickBool[4] && !kickBool[5] && !kickBool[6] && !kickBool[7] && !kickBool[8] && !kickBool[9] && !kickBool[10] && !kickBool[11] && !kickBool[12] && !kickBool[13] && !kickBool[14] && !kickBool[15] && kickBool[16] && !kickBool[17] && !kickBool[18] && !kickBool[19] && !kickBool[20] && !kickBool[21] && !kickBool[22] && !kickBool[23] && !kickBool[24] && !kickBool[25] && !kickBool[26] && !kickBool[27] && !kickBool[28] && !kickBool[29] && !kickBool[30] && !kickBool[31] && kickBool[32] && !kickBool[33] && !kickBool[34] && !kickBool[35] && !kickBool[36] && !kickBool[37] && !kickBool[38] && !kickBool[39] && !kickBool[40] && !kickBool[41] &!kickBool[42] && !kickBool[43] && !kickBool[44] && !kickBool[45] && !kickBool[46] && !kickBool[47] && kickBool[48] && !kickBool[49] && !kickBool[50] && !kickBool[51] && !kickBool[52] && !kickBool[53] && !kickBool[54] && !kickBool[55] && !kickBool[56] && !kickBool[57] && !kickBool[58] && !kickBool[59] && !kickBool[60] && !kickBool[61] && !kickBool[62] && !kickBool[63]) {
        if (!snareBool[0] && !snareBool[1] && !snareBool[2] && !snareBool[3] && !snareBool[4] && !snareBool[5] && !snareBool[6] && !snareBool[7] && snareBool[8] && !snareBool[9] && !snareBool[10] && !snareBool[11] && !snareBool[12] && !snareBool[13] && !snareBool[14] && !snareBool[15] && !snareBool[16] && !snareBool[17] && !snareBool[18] && !snareBool[19] && !snareBool[20] && !snareBool[21] && !snareBool[22] && !snareBool[23] && snareBool[24] && !snareBool[25] && !snareBool[26] && !snareBool[27] && !snareBool[28] && !snareBool[29] && snareBool[30] && !snareBool[31] && !snareBool[32] && !snareBool[33] && !snareBool[34] && !snareBool[35] && !snareBool[36] && !snareBool[37] && !snareBool[38] && !snareBool[39] && snareBool[40] && !snareBool[41] && !snareBool[41] && !snareBool[43] && !snareBool[44] && !snareBool[45] && !snareBool[46] && !snareBool[47] && !snareBool[48] && !snareBool[49] && !snareBool[50] && !snareBool[51] && !snareBool[52] && !snareBool[53] && !snareBool[54] && !snareBool[55] && snareBool[56] && !snareBool[57] && snareBool[58] && !snareBool[59] && !snareBool[60] && !snareBool[61] && snareBool[62] && !snareBool[63]) {
            if (!hiHatCBool[0] && !hiHatCBool[1] && hiHatCBool[2] && !hiHatCBool[3] && !hiHatCBool[4] && !hiHatCBool[5] && !hiHatCBool[6] && !hiHatCBool[7] && !hiHatCBool[8] && !hiHatCBool[9] && !hiHatCBool[10] && !hiHatCBool[11] && !hiHatCBool[12] && !hiHatCBool[13] && !hiHatCBool[14] && !hiHatCBool[15] && !hiHatCBool[16] && !hiHatCBool[17] && hiHatCBool[18] && !hiHatCBool[19] && !hiHatCBool[20] && !hiHatCBool[21] && !hiHatCBool[22] && !hiHatCBool[23] && !hiHatCBool[24] && !hiHatCBool[25] && !hiHatCBool[26] && !hiHatCBool[27] && !hiHatCBool[28] && !hiHatCBool[29] && !hiHatCBool[30] && !hiHatCBool[31] && !hiHatCBool[32] && !hiHatCBool[33] && hiHatCBool[34] && !hiHatCBool[35] && !hiHatCBool[36] && !hiHatCBool[37] && !hiHatCBool[38] && !hiHatCBool[39] && !hiHatCBool[40] && !hiHatCBool[41] && !hiHatCBool[41] && !hiHatCBool[43] && !hiHatCBool[44] && !hiHatCBool[45] && !hiHatCBool[46] && !hiHatCBool[47] && !hiHatCBool[48] && !hiHatCBool[49] && hiHatCBool[50] && !hiHatCBool[51] && !hiHatCBool[52] && !hiHatCBool[53] && !hiHatCBool[54] && !hiHatCBool[55] && !hiHatCBool[56] && !hiHatCBool[57] && !hiHatCBool[58] && !hiHatCBool[59] && hiHatCBool[60] && !hiHatCBool[61] && !hiHatCBool[62] && !hiHatCBool[63]) {
                if (!hiHatOpBool[0] && !hiHatOpBool[1] && !hiHatOpBool[2] && !hiHatOpBool[3] && !hiHatOpBool[4] && !hiHatOpBool[5] && !hiHatOpBool[6] && !hiHatOpBool[7] && !hiHatOpBool[8] && !hiHatOpBool[9] && !hiHatOpBool[10] && !hiHatOpBool[11] && hiHatOpBool[12] && !hiHatOpBool[13] && !hiHatOpBool[14] && !hiHatOpBool[15] && !hiHatOpBool[16] && !hiHatOpBool[17] && !hiHatOpBool[18] && !hiHatOpBool[19] && !hiHatOpBool[20] && !hiHatOpBool[21] && !hiHatOpBool[22] && !hiHatOpBool[23] && !hiHatOpBool[24] && !hiHatOpBool[25] && !hiHatOpBool[26] && !hiHatOpBool[27] && !hiHatOpBool[28] && !hiHatOpBool[29] && !hiHatOpBool[30] && !hiHatOpBool[31] && !hiHatOpBool[32] && !hiHatOpBool[33] && !hiHatOpBool[34] && !hiHatOpBool[35] && !hiHatOpBool[36] && !hiHatOpBool[37] && !hiHatOpBool[38] && !hiHatOpBool[39] && !hiHatOpBool[40] && !hiHatOpBool[41] && !hiHatOpBool[41] && !hiHatOpBool[43] && hiHatOpBool[44] && !hiHatOpBool[45] && !hiHatOpBool[46] && !hiHatOpBool[47] && !hiHatOpBool[48] && !hiHatOpBool[49] && !hiHatOpBool[50] && !hiHatOpBool[51] && !hiHatOpBool[52] && !hiHatOpBool[53] && !hiHatOpBool[54] && !hiHatOpBool[55] && !hiHatOpBool[56] && !hiHatOpBool[57] && !hiHatOpBool[58] && !hiHatOpBool[59] && !hiHatOpBool[60] && !hiHatOpBool[61] && !hiHatOpBool[62] && !hiHatOpBool[63]) {
                    console.log('User victoryyyyyy!!!');
//                    $('#toggleUserLoop').text("play_your_objectvely_superior_beat"); //// very icebox-y
                    victory = true;
                    computerDefeat.play();
                };
            };
        };
    }
    else { console.log('no win yet!') }
}

//// BEATS:
//// MEASURE 1: 00 01 02 03 | 04 05 06 07 | 08 09 10 11 | 12 13 14 15
//// MEASURE 2: 16 17 18 19 | 20 21 22 23 | 24 25 26 27 | 28 29 30 31
//// MEASURE 3: 32 33 34 35 | 36 37 38 39 | 40 41 42 43 | 44 45 46 47
//// MEASURE 4: 48 49 50 51 | 52 53 54 55 | 56 57 58 59 | 60 61 62 63