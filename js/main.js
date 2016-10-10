//// new for project 10/5/16
//// CURRENT BUGS:
//// css gets swallowed when <~650px
//// visualizer not receiving userLoop
//// can't stop userLoop immediately

console.log("main js loaded")

var bpm = 95; 
var beat = 160 / bpm;
var loopMs = beat * 1000 * 4;
var looper = true;
var audio = new Audio();
var fakeAudio = new Audio();
audio.controls = false;
audio.loop = false;
audio.autoplay = false;
var visualizerAudioSrc = "assets/kickEdit.mp3";
audio.src = visualizerAudioSrc;

//// create "instruments" for each sound. WORKING
var kick = new Wad({source: 'assets/kickEdit.mp3'});
var snare = new Wad({source: 'assets/snareNoise.mp3'});
    snare.setVolume(1);
var hiHatC = new Wad({source: 'assets/hiHatC.mp3'});
var hiHatOp = new Wad({source: 'assets/hiHatOp.mp3'});
var stepRemoveFx = new Wad({source: 'assets/stepRemoveFx.mp3', volume: .4});
var haltFx = new Wad({source: 'assets/haltFx.mp3'});
    haltFx.setVolume(0.5);
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
//// WORKING
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

//// add click listener to steps and toggle boolean values 
//// WORKING
//// toggle step lighting up when selected/deselected WORKING
$('.kickSteps, .snareSteps, .hiHatCSteps, .hiHatOpSteps').click(function(event) {
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#kick' + i) {
            if (kickBool[i] === false) { 
                kickBool[i] = true; $(event.target).addClass('litSteps'); 
                kick.play();
//                visualizerAudioSrc = 'assets/kickEdit.mp3';
//                updateAudioSrc(); 
//                audio.play();
            }
            else { 
                kickBool[i] = false; $(event.target).removeClass('litSteps');
                stepRemoveFx.play();
            } 
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#snare' + i) {
            if (snareBool[i] === false) { 
                snareBool[i] = true; $(event.target).addClass('litSteps');
                snare.play();
//                visualizerAudioSrc = snare; RECORD
//                visualizerAudioSrc = 'assets/snare.wav'
//                updateAudioSrc();
            }
            else { 
                snareBool[i] = false; $(event.target).removeClass('litSteps');
                stepRemoveFx.play();
            }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatC' + i) {
            if (hiHatCBool[i] === false) { 
                hiHatCBool[i] = true; $(event.target).addClass('litSteps');
                hiHatC.play();
            }
            else { 
                hiHatCBool[i] = false; $(event.target).removeClass('litSteps');
                stepRemoveFx.play();
            }  
        }
    }
    for (var i=0; i<=63; i++) {
        if (event.target.id === '#hiHatOp' + i) {
            if (hiHatOpBool[i] === false) { 
                hiHatOpBool[i] = true; $(event.target).addClass('litSteps');
                hiHatOp.play({volume: .5});
            }
            else { 
                hiHatOpBool[i] = false; $(event.target).removeClass('litSteps');
                stepRemoveFx.play();
            }  
        }
    }
})

//// build empty loops for each instrument WORKING
//// bounce 
//// set timeout for each updateAudioSrc
function kickLoop() {
    var beatCounter = 0;
    flashOrBar();
    for (var i=0; i<=63; i++) {
        if (kickBool[i] && !computerLoopClickable && !instructionsClickable) { 
//            kick.play({wait : beat * beatCounter});
            setTimeout(function() {
                visualizerAudioSrc = 'assets/kickEdit.mp3';
                updateAudioSrc();
                audio.play();
                console.log('kitLoop setTimeout1 entered')
                console.timeEnd('kick')
            }, beat * beatCounter * 1000)
        };
        beatCounter += 0.0625;
    }
//    flashOrBar();
        //// if orBar is clicked, reassign kick.play then 
        //// assign is again? Just break the code and 
        //// reassemble it again ?
        //// UPDATE: can reassign it this way, but the loop 
        //// still plays through as executed (need it above?)
//    $('#orBar').click(function() {
//    kick = new Wad({source: 'assets/haltFx.mp3'});        
//    console.log('or bar clicked in kickLoop')
//        }) 
}

function snareLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (snareBool[i]) { 
//            snare.play({wait : beat * beatCounter}); 
            setTimeout(function() {
                visualizerAudioSrc = 'assets/snareNoise.mp3';
                updateAudioSrc();
                audio.play();
            }, beat * beatCounter * 1000)                 
        }
//        if (!looper) { return } // not stopping immediately
        beatCounter += 0.0625;
    }
}

function hiHatCLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatCBool[i]) { 
//            hiHatC.play({wait : beat * beatCounter}) 
            setTimeout(function() {
                visualizerAudioSrc = 'assets/hiHatC.mp3';
                updateAudioSrc();
                audio.play();
            }, beat * beatCounter * 1000)
        }
        beatCounter += 0.0625;
    }
}

function hiHatOpLoop() {
    var beatCounter = 0;
    for (var i=0; i<=63; i++) {
        if (hiHatOpBool[i]) { 
//            hiHatOp.play({wait : beat * beatCounter}) 
            setTimeout(function() {
                visualizerAudioSrc = 'assets/hiHatOp.mp3';
                updateAudioSrc();
                audio.play();
            }, beat * beatCounter * 1000)
        }
        beatCounter += 0.0625;
    }
}

//// launch entire kit's loops WORKING
function kitLoop() {
    kickLoop();
    snareLoop();
    hiHatCLoop();
    hiHatOpLoop();
    metronome();
}

//// make divs light up with metronome WORKING
function metronome() {
    $('.kickSteps').eq(0).addClass('metronome');
    $('.snareSteps').eq(0).addClass('metronome');
    $('.hiHatCSteps').eq(0).addClass('metronome');
    $('.hiHatOpSteps').eq(0).addClass('metronome');
    var stepCount = 4;
    setInterval(function() {  
        for (var i=stepCount; i<stepCount+1; i++) {
            $('.kickSteps').eq(i).addClass('metronome');
            $('.kickSteps').eq(i-4).removeClass('metronome');
        }
        for (var i=stepCount; i<stepCount+1; i++) {
            $('.snareSteps').eq(i).addClass('metronome');
            $('.snareSteps').eq(i-4).removeClass('metronome')
        }
        for (var i=stepCount; i<stepCount+1; i++) {
            $('.hiHatCSteps').eq(i).addClass('metronome');
            $('.hiHatCSteps').eq(i-4).removeClass('metronome')
        }
        for (var i=stepCount; i<stepCount+1; i++) {
            $('.hiHatOpSteps').eq(i).addClass('metronome');
            $('.hiHatOpSteps').eq(i-4).removeClass('metronome')
        }
        stepCount += 4;
    }, beat * 250);
}

//// deliver instructions on click WORKING
//// prevent from doubling WORKING
//// toggle "Instructions" & "PRINT, etc" WORKING
var $instructions = $('#instructions')
var instructionsClickable = true;
var instructions = false;

$($instructions).click(function() {
    if (instructionsClickable) { 
//        computerInstructions.play(); 
        visualizerAudioSrc = 'assets/computerInstructions.mp3';
        updateAudioSrc();
        audio.play();
        flashOrBar();
        setTimeout(function() { 
            console.log('setTimeout entered in toggle pause')
            instructions = true; 
            instructionsClickable = true;
            computerLoopClickable = true;
            userLoopClickable = true;
            toggleInstructions();
        }, 49000);
        computerLoopClickable = false;
        userLoopClickable = false;
    }; 
    console.log('instructions/print clicked');
    instructions = false;
    instructionsClickable = false;
    if (userLoopClickable && computerLoopClickable) {
        $($instructions).text(`PRINT("this_machine's_got_rhythm")`);
    };
});

function toggleInstructions() {
    if (instructions) {
        console.log('instructions "if" entered')
        if (userLoopClickable || computerLoopClickable) {
            $instructions.hover(function() {
                $($instructions).text('#_____Instructions_____#')
            }, function() {
                $($instructions).text(`PRINT("this_machine's_got_rhythm")`)
            });
        }
    }
}

//// make instructions flash until clicked WORKING
clickCounter = 0;
if (clickCounter < 1) { 
    clkIntInstructions = setInterval(function() {
        $instructions.toggleClass('instructionsFlash');
        console.log("instructions interval entered")
    }, 500);
}
$instructions.click(function() {
    console.log("should turn off from here!");
    clickCounter++;
    clearInterval(clkIntInstructions);
});

//// make " ||||| " flash when computerLoop and Instructions 
//// play WORKING
var $pipeBar = $('#orBar');
function flashOrBar() {
    clkIntOrBar = setInterval(function() {
        $pipeBar.toggleClass('orBarFlash');
        console.log('or bar interval entered')
    }, 500);   
    $pipeBar.click(function() {
        console.log("OR Bar clicked!");
        clearInterval(clkIntOrBar);
        visualizerAudioSrc = 'assets/emptyAudio.mp3';
        updateAudioSrc();
//        audio.play(); 
        haltFx.play();
        userLoopClickable = true;
        computerLoopClickable = true;
        instructionsClickable = true;
    });
    setTimeout(function() {
        clearInterval(clkIntOrBar);
    }, 49000);
}

//// connect 'click' to #playComputerLoop WORKING
//// call computer's beat WORKING
//// prevent beat from doubling WORKING
//// toggle "play_my_wicked_beat" text WORKING
var computerLoopClickable = true;
$('#startComputerLoop').click(function(e) {
    if (computerLoopClickable) {
        userLoopClickable = false;
        instructionsClickable = false;
        e.target.innerHTML = "now_that's_d3rang3d";
////        computerLoopEasy.play(); 
        visualizerAudioSrc = 'assets/computerLoopEasy.mp3';
        updateAudioSrc();
        audio.play();
        flashOrBar();
        setTimeout(function() { 
            console.log('setTimeout entered in toggle pause');
            e.target.innerHTML = "play_my_wick3d_beat";
            computerLoopClickable = true;
            userLoopClickable = true;
            instructionsClickable = true;
        }, loopMs)
    };
    computerLoopClickable = false;
})

//// toggle "play/pause" text WORKING
var victory = false;
var pauser = false;
var userLoopClickable = true;
if (!victory) {
//    loopClickable = true;
    $('#toggleUserLoop').click(function(e) {
        if (userLoopClickable) {
            computerLoopClickable = false;
            instructionsClickable = false;
            userLoopClickable = false;
//            visualizerAudioSrc = 'assets/kickEdit.mp3';
//            updateAudioSrc();
//            audio.play();
        if (e.target.innerHTML === "play_your_wanna_beat" || "acc3ptable sauce") {
            e.target.innerHTML = "that_sauce_is_w3ak";
//            if (victory) { 
//                e.target.innerHTML = "acc3ptable_sauce"}
//            pauser = false;
            kitLoop(); 
// insert audio readjustment here?
            setTimeout(function() { 
                console.log('setTimeout entered in toggle pause')
                e.target.innerHTML = "play_your_wanna_beat";
                userLoopClickable = true;
                computerLoopClickable = true;
                instructionsClickable = true;
                userLoopClickable = true;
            }, loopMs)
        } 
        }
})}

//// check for victory on every div click (all step var's 
//// match the key's bool values) WORKING
$('.kickSteps, .snareSteps, .hiHatCSteps, .hiHatOpSteps').click(winCheck);
function winCheck() {
    if (kickBool[0] && !kickBool[1] && !kickBool[2] && !kickBool[3] && !kickBool[4] && !kickBool[5] && !kickBool[6] && !kickBool[7] && !kickBool[8] && !kickBool[9] && !kickBool[10] && !kickBool[11] && !kickBool[12] && !kickBool[13] && !kickBool[14] && !kickBool[15] && kickBool[16] && !kickBool[17] && !kickBool[18] && !kickBool[19] && !kickBool[20] && !kickBool[21] && !kickBool[22] && !kickBool[23] && !kickBool[24] && !kickBool[25] && !kickBool[26] && !kickBool[27] && !kickBool[28] && !kickBool[29] && !kickBool[30] && !kickBool[31] && kickBool[32] && !kickBool[33] && !kickBool[34] && !kickBool[35] && !kickBool[36] && !kickBool[37] && !kickBool[38] && !kickBool[39] && !kickBool[40] && !kickBool[41] &!kickBool[42] && !kickBool[43] && !kickBool[44] && !kickBool[45] && !kickBool[46] && !kickBool[47] && kickBool[48] && !kickBool[49] && !kickBool[50] && !kickBool[51] && !kickBool[52] && !kickBool[53] && !kickBool[54] && !kickBool[55] && !kickBool[56] && !kickBool[57] && !kickBool[58] && !kickBool[59] && !kickBool[60] && !kickBool[61] && !kickBool[62] && !kickBool[63]) {
        if (!snareBool[0] && !snareBool[1] && !snareBool[2] && !snareBool[3] && !snareBool[4] && !snareBool[5] && !snareBool[6] && !snareBool[7] && snareBool[8] && !snareBool[9] && !snareBool[10] && !snareBool[11] && !snareBool[12] && !snareBool[13] && !snareBool[14] && !snareBool[15] && !snareBool[16] && !snareBool[17] && !snareBool[18] && !snareBool[19] && !snareBool[20] && !snareBool[21] && !snareBool[22] && !snareBool[23] && snareBool[24] && !snareBool[25] && !snareBool[26] && !snareBool[27] && !snareBool[28] && !snareBool[29] && snareBool[30] && !snareBool[31] && !snareBool[32] && !snareBool[33] && !snareBool[34] && !snareBool[35] && !snareBool[36] && !snareBool[37] && !snareBool[38] && !snareBool[39] && snareBool[40] && !snareBool[41] && !snareBool[41] && !snareBool[43] && !snareBool[44] && !snareBool[45] && !snareBool[46] && !snareBool[47] && !snareBool[48] && !snareBool[49] && !snareBool[50] && !snareBool[51] && !snareBool[52] && !snareBool[53] && !snareBool[54] && !snareBool[55] && snareBool[56] && !snareBool[57] && snareBool[58] && !snareBool[59] && !snareBool[60] && !snareBool[61] && snareBool[62] && !snareBool[63]) {
            if (!hiHatCBool[0] && !hiHatCBool[1] && hiHatCBool[2] && !hiHatCBool[3] && !hiHatCBool[4] && !hiHatCBool[5] && !hiHatCBool[6] && !hiHatCBool[7] && !hiHatCBool[8] && !hiHatCBool[9] && !hiHatCBool[10] && !hiHatCBool[11] && !hiHatCBool[12] && !hiHatCBool[13] && !hiHatCBool[14] && !hiHatCBool[15] && !hiHatCBool[16] && !hiHatCBool[17] && hiHatCBool[18] && !hiHatCBool[19] && !hiHatCBool[20] && !hiHatCBool[21] && !hiHatCBool[22] && !hiHatCBool[23] && !hiHatCBool[24] && !hiHatCBool[25] && !hiHatCBool[26] && !hiHatCBool[27] && !hiHatCBool[28] && !hiHatCBool[29] && !hiHatCBool[30] && !hiHatCBool[31] && !hiHatCBool[32] && !hiHatCBool[33] && hiHatCBool[34] && !hiHatCBool[35] && !hiHatCBool[36] && !hiHatCBool[37] && !hiHatCBool[38] && !hiHatCBool[39] && !hiHatCBool[40] && !hiHatCBool[41] && !hiHatCBool[41] && !hiHatCBool[43] && !hiHatCBool[44] && !hiHatCBool[45] && !hiHatCBool[46] && !hiHatCBool[47] && !hiHatCBool[48] && !hiHatCBool[49] && hiHatCBool[50] && !hiHatCBool[51] && !hiHatCBool[52] && !hiHatCBool[53] && !hiHatCBool[54] && !hiHatCBool[55] && !hiHatCBool[56] && !hiHatCBool[57] && !hiHatCBool[58] && !hiHatCBool[59] && hiHatCBool[60] && !hiHatCBool[61] && !hiHatCBool[62] && !hiHatCBool[63]) {
                if (!hiHatOpBool[0] && !hiHatOpBool[1] && !hiHatOpBool[2] && !hiHatOpBool[3] && !hiHatOpBool[4] && !hiHatOpBool[5] && !hiHatOpBool[6] && !hiHatOpBool[7] && !hiHatOpBool[8] && !hiHatOpBool[9] && !hiHatOpBool[10] && !hiHatOpBool[11] && hiHatOpBool[12] && !hiHatOpBool[13] && !hiHatOpBool[14] && !hiHatOpBool[15] && !hiHatOpBool[16] && !hiHatOpBool[17] && !hiHatOpBool[18] && !hiHatOpBool[19] && !hiHatOpBool[20] && !hiHatOpBool[21] && !hiHatOpBool[22] && !hiHatOpBool[23] && !hiHatOpBool[24] && !hiHatOpBool[25] && !hiHatOpBool[26] && !hiHatOpBool[27] && !hiHatOpBool[28] && !hiHatOpBool[29] && !hiHatOpBool[30] && !hiHatOpBool[31] && !hiHatOpBool[32] && !hiHatOpBool[33] && !hiHatOpBool[34] && !hiHatOpBool[35] && !hiHatOpBool[36] && !hiHatOpBool[37] && !hiHatOpBool[38] && !hiHatOpBool[39] && !hiHatOpBool[40] && !hiHatOpBool[41] && !hiHatOpBool[41] && !hiHatOpBool[43] && hiHatOpBool[44] && !hiHatOpBool[45] && !hiHatOpBool[46] && !hiHatOpBool[47] && !hiHatOpBool[48] && !hiHatOpBool[49] && !hiHatOpBool[50] && !hiHatOpBool[51] && !hiHatOpBool[52] && !hiHatOpBool[53] && !hiHatOpBool[54] && !hiHatOpBool[55] && !hiHatOpBool[56] && !hiHatOpBool[57] && !hiHatOpBool[58] && !hiHatOpBool[59] && !hiHatOpBool[60] && !hiHatOpBool[61] && !hiHatOpBool[62] && !hiHatOpBool[63]) {
                    console.log('User victoryyyyyy!!!');
                    $('#toggleUserLoop').text("acceptable_sauce"); //// very icebox-y
                    victory = true;
//                    computerDefeat.play();
                    visualizerAudioSrc = 'assets/computerDefeat.mp3';
                    updateAudioSrc();
                    audio.play();
                };
            };
        };
    }
    else { console.log('no win yet!') }
}

//// visualizer: WORKING
// Create a new instance of an audio object and adjust some of 
// its properties (above---^)

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its 
// HTML into the window
window.addEventListener("load", initMp3Player, false); 
document.getElementById('audio_box').appendChild(audio);
function initMp3Player(){
    audio.src = visualizerAudioSrc;
//	document.getElementById('audio_box').removeChild(audio);
    document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = document.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}

// adding function to update audio src's
function updateAudioSrc() {
    audio.src = visualizerAudioSrc;
    document.getElementById('audio_box').appendChild(audio);
}

// frameLooper() animates any style of graphics you wish to 
// the audio frequency
// Looping at the default frame rate that the browser 
// provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#697368'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 3;
		bar_height = -(fbc_array[i] / 2);
		//  fillRect( x, y, width, height ) // 
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}

// https://www.developphp.com/video/JavaScript/Analyser-Bars-Animation-HTML-Audio-API-Tutorial
//// EXPERIMENTING:
//$8BitBeatdown = $('#8BitBeatdown')
//$8BitBeatdown.click(function(e) {
//    visualizerAudioSrc = "assets/kickEdit.mp3"
//    updateAudioSrc();
//    audio.play();
//    }
//)

//// BEATS:
//// MEASURE 1: 00 01 02 03 | 04 05 06 07 | 08 09 10 11 | 12 13 14 15
//// MEASURE 2: 16 17 18 19 | 20 21 22 23 | 24 25 26 27 | 28 29 30 31
//// MEASURE 3: 32 33 34 35 | 36 37 38 39 | 40 41 42 43 | 44 45 46 47
//// MEASURE 4: 48 49 50 51 | 52 53 54 55 | 56 57 58 59 | 60 61 62 63