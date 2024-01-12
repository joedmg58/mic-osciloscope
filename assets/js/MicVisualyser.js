class MicVisualyser {
    constructor(canvas, audio, gridSize=20) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');   
        this.gridSize = gridSize;

        this.vu = new VU(this.canvas);
        
        this.analyser = audio.createAnalyser();
        this.analyser.fftSize = 512; // 2048 ;
        audio.microphone.connect(this.analyser);
        //this.dataArray = new Float32Array(this.analyser.frequencyBinCount);
        //this.analyser.connect(audio.destination);

        this.animate();
    }

    #updateCanvas() {
        this.canvas.width = window.innerHeight * 0.5;
        this.canvas.height = window.innerHeight * 0.5;

        this.#drawGrid();
    }

    #drawGrid() {
        var step = Math.round( this.canvas.width / this.gridSize );
        this.ctx.strokeStyle = 'rgba(182,188,5,0.25)';
        this.ctx.clearRect(0,0,this.canvas.width,this.CANVAS_HEIGHT);
        this.ctx.beginPath();
        for ( let x=0; x<=this.canvas.width; x+=step) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        step = Math.round( this.canvas.height / this.gridSize );
        for( let y=0; y<=this.canvas.height; y+=step) {
            this.ctx.moveTo(0,y);
            this.ctx.lineTo(this.canvas.width, y);
        }

        this.ctx.stroke();
    }

    plotAudio() {
        const dataArray = new Float32Array(this.analyser.frequencyBinCount);
        this.analyser.getFloatTimeDomainData(dataArray);
        //console.log(dataArray);
        //debugger;
        
        //const normSamples = this.dataArray.map(e => e/128-1); //normalize values between -1 and 1

        let level = 0;


        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'green';//'rgba(84,235,25,0,93)';
        this.ctx.moveTo(0, this.canvas.height/2);
        for (let i=0; i<dataArray.length; i++) {
            this.ctx.lineTo(this.canvas.width*i/dataArray.length, this.canvas.height/2 + dataArray[i]*100);
            level += dataArray[i];
        }
        this.ctx.stroke();

        level = level*150 / dataArray.length;
        this.vu.update(level);
    }

    animate() {
        this.#updateCanvas();

        this.vu.draw();

        this.plotAudio();

        requestAnimationFrame(this.animate.bind(this));
    }
}