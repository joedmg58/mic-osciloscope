class VU {
    constructor(canvas) {
        this.level = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    update(level) {
        this.level = level;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(this.canvas.width/2, 3*this.canvas.height/4);
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = 'gray';
        this.ctx.arc(0, 0, 0.4*this.canvas.width/2, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(0, 0, 0.36*this.canvas.width/2, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.restore();
        
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 4;
        this.ctx.translate(this.canvas.width/2, 3*this.canvas.height/4 + 0.36*this.canvas.width/2);
        const vulen =  -1.4*0.36*this.canvas.width/2;
        let alpha = Math.PI/2 + this.level / Math.PI/2;
        if (alpha > Math.PI/1.4) {alpha = Math.PI/1.4}
        if (alpha < Math.PI/4) {alpha = Math.PI/4}
        const x = vulen * Math.cos(alpha);
        const y = vulen * Math.sin(alpha);
        this.ctx.moveTo(0,0);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.moveTo(0,0);
        this.ctx.arc(0, 0, 0.5*0.36*this.canvas.width/2, Math.PI, 2*Math.PI);
        this.ctx.fillStyle = 'gray';
        this.ctx.fill();
        this.ctx.restore();
    }
}