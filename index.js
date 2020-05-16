function Html5Effect() {
    this.html5Function = (container) => {
        var canvas = document.querySelector(container);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // window.console.log("1");


        var c = canvas.getContext("2d");
        var mouse = {
            x: undefined,
            y: undefined,
        }
        var maxRadius = 40;
        var minRadius = 10;
        var colorArray = [
            '#CC126B',
            '#BD1A1A',
            '#CC7524',
            '#234B04',
            '#D9A404',
        ];
        window.addEventListener('mousemove', function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
        })
        window.addEventListener('resize', function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        })
        function Circle(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.minRadius = minRadius;
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
            this.draw = function () {
                // window.console.log("adsfa");
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = this.color
                c.fill();

            }
            this.update = function () {
                if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }
                if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                    this.dy = -this.dy;
                }
                this.x += this.dx;
                this.y += this.dy;
                if ((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {
                    if (this.radius < maxRadius) {
                        this.radius += 5;
                    }

                } else if (this.radius > this.minRadius) {
                    this.radius -= 1;
                }
                this.draw();
            }


        }
        var circleArray = [];
        function init() {

            for (var i = 0; i < 200; i++) {
                var radius = Math.random() * 3 + 1;
                var x = Math.random() * (innerWidth - radius * 2) + radius;
                var y = Math.random() * (innerHeight - radius * 2) + radius;
                var dx = (Math.random() - 0.5) * 8;
                var dy = (Math.random() - 0.5) * 8;
                // var circle = ;
                circleArray.push(new Circle(x, y, dx, dy, radius))

            }
        }


        function animate() {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            for (var i = 0; i < circleArray.length; i++) {
                circleArray[i].update();
            }
            // circle.update();
            // window.console.log("1");
        }
        init();
        animate();
    }

}

var container = "canvas"
var html5 = new Html5Effect();
html5.html5Function(container);