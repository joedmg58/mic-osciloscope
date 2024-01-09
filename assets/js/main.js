let CANVAS_WIDTH;
let CANVAS_HEIGHT;

var myAudio;

navigator.mediaDevices.getUserMedia({audio:true})
            .then(function(rawData) {
                myAudio = document.createElement('audio');
                myAudio.srcObject = rawData;
                myAudio.volume = 0;
                myAudio.play();
            })
            .catch(function(error){
                alert(error);
            })

const myCanvas = document.getElementById('my-canvas');
updateCanvasSize();
const ctx = myCanvas.getContext('2d');

function updateCanvasSize() {
    CANVAS_WIDTH = myCanvas.width = window.innerHeight * 0.5;
    CANVAS_HEIGHT = myCanvas.height = window.innerHeight * 0.5;
}

window.addEventListener('resize', function() {
    updateCanvasSize();
    drawGrid(ctx, 20);
}, true);

function drawGrid(ctx, gridSize) {
    var step = Math.round( CANVAS_WIDTH / gridSize );
    ctx.strokeStyle = 'rgba(182,188,5,0.25)';
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.beginPath();
    for ( let x=0; x<=CANVAS_WIDTH; x+=step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
    }
    step = Math.round( CANVAS_HEIGHT / gridSize );
    for( let y=0; y<=CANVAS_HEIGHT; y+=step) {
        ctx.moveTo(0,y);
        ctx.lineTo(CANVAS_WIDTH, y);
    }

    ctx.stroke();
}

function animate() {
    drawGrid(ctx, 20);

    drawAudioLevel(ctx);

    requestAnimationFrame(animate);
}

const audio = new AudioContext();  
const microphone = audio.createMediaStreamSource(myAudio.srcObject); 
const analyser = audio.createAnalyser();
microphone.connect(analyser);

function drawAudioLevel(ctx) {
    const dataArray = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatTimeDomainData(dataArray);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(84,235,25,0,93)';
    ctx.moveTo(0, CANVAS_HEIGHT/2);
    for (let i=0; i<dataArray.length; i++) {
        ctx.lineTo(CANVAS_WIDTH*i/dataArray.length, CANVAS_HEIGHT/2 + dataArray[i]*100);
    }
    ctx.stroke();

}

animate();