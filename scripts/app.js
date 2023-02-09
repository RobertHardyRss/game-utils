//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */ //@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const mouse = {
	x: 0,
	y: 0,
	lineTo: false,
	drawCursor: function () {
		let xOffset = 20;
		let yOffset = 20;
		let textAlign = "left";

		if (this.x >= canvas.width - 100) {
			textAlign = "right";
			xOffset *= -1;
		}

		if (this.y >= canvas.height - 50) {
			yOffset *= -1;
		}

		ctx.save();
		ctx.font = "10pt arial";
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		//@ts-ignore assigning a valid alignment string
		ctx.textAlign = textAlign;
		ctx.fillText(
			`(x: ${this.x}, y: ${this.y})`,
			this.x + xOffset,
			this.y + yOffset
		);
		ctx.restore();
	},
};

canvas.addEventListener("mousemove", (e) => {
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
});

window.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "KeyL":
			mouse.lineTo = true;
			break;
	}
});

window.addEventListener("keyup", (e) => {
	switch (e.code) {
		case "KeyL":
			mouse.lineTo = false;
			break;
	}
});

const compass = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	r: canvas.height / 4,
	draw: function () {
		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.beginPath();
		ctx.strokeStyle = "rgba(128, 128, 128, 0.8)";
		ctx.arc(0, 0, this.r, 0, Math.PI * 2);
		ctx.stroke();

		const lineLength = this.r + 20;
		ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
		ctx.beginPath();
		ctx.moveTo(0, lineLength);
		ctx.lineTo(0, lineLength * -1);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(lineLength, 0);
		ctx.lineTo(lineLength * -1, 0);
		ctx.stroke();
		ctx.restore();

		if (mouse.lineTo) {
			ctx.save();
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
			ctx.restore();
		}
	},
};

/**
 * @param {number} timestamp
 */
function drawLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	compass.draw();
	mouse.drawCursor();
	requestAnimationFrame(drawLoop);
}

drawLoop(0);
