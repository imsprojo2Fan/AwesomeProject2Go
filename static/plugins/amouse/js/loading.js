let loadFlag;
//加载动画效果--开始
var canvas = document.createElement( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    width = 400,
    height = 100,
    loaded = 0,
    loaderSpeed = 0.6,
    loaderWidth = 310,
    loaderHeight = 16,
    loaderX = width / 2 - loaderWidth / 2,
    loaderY = height / 2 - loaderHeight / 2,
    particles = [],
    particleLift = 180,
    particleRate = 4,
    hueStart = 0,
    hueEnd = 120,
    hue = 0,
    gravity = 0.12,
    dpr = window.devicePixelRatio;

document.body.appendChild( canvas );
canvas.width = width;
canvas.height = height;
canvas.style.width = ( width / dpr ) + 'px';
canvas.style.height = ( height / dpr ) + 'px';
ctx.globalCompositeOperation = 'lighter';

function rand( rMi, rMa ) {
    return ~~((Math.random()*(rMa-rMi+1))+rMi);
}

function updateLoader() {
    if( loaded < 100 ) {
        loaded += loaderSpeed;
    } else {
        loaded = 0;
    }
    if(loaded>100){
        if(loadFlag){
            return;
        }
        loadFlag = true;
        //动画加载完成
        $('canvas').fadeOut(100);
        $('#mainWrap').fadeIn(3000);
        setTimeout(function () {
            $('#t1').fadeIn(800);
        },500);
        let index = 0;
        //更改iframe生成动效
        window.parent.changeFrameHeight(10);
        setInterval(function(){
            index++;
            if(index<1){
                return;
            }
            if(index==27){
                //切换文字
                $(window.parent.document).find("#mainframe").attr("src", "/interesting/txt_effect_4");
                return;
            }
            if(index<10){
                if(index==9){
                    $('#content01').fadeOut(3000);
                    $('#content02').fadeIn(3000);
                    window.parent.changeFrameHeight(10);
                }
                $('#next').trigger('click');
            }else if(index<19){
                if(index==18){
                    $('#content02').fadeOut(3000);
                    $('#content03').fadeIn(3000);
                    window.parent.changeFrameHeight(10);
                }
                $('#next2').trigger('click');
            }else{
                $('#next3').trigger('click');
            }
        },4000);

    }
}

function renderLoader() {
    ctx.fillStyle = '#000';
    ctx.fillRect( loaderX, loaderY, loaderWidth, loaderHeight );

    hue = hueStart + ( loaded / 100 ) * ( hueEnd - hueStart );

    var newWidth = ( loaded / 100 ) * loaderWidth;
    ctx.fillStyle = 'hsla(' + hue + ', 100%, 40%, 1)';
    ctx.fillRect( loaderX, loaderY, newWidth, loaderHeight );

    ctx.fillStyle = '#013250';
    ctx.fillRect( loaderX, loaderY, newWidth, loaderHeight / 2 );
}

function Particle() {
    this.x = loaderX + ( ( loaded / 100 ) * loaderWidth ) - rand( 0, 1 );
    this.y = height / 2 + rand( 0, loaderHeight ) - loaderHeight / 2;
    this.vx = ( rand( 0, 4 ) - 2 ) / 100;
    this.vy = ( rand( 0, particleLift ) - particleLift * 2 ) / 100;
    this.width = rand( 1, 4 ) / 2;
    this.height = rand( 1, 4 ) / 2;
    this.hue = hue;
}

Particle.prototype.update = function( i ) {
    this.vx += ( rand( 0, 6 ) - 3 ) / 100;
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    if( this.y > height ) {
        particles.splice( i, 1 );
    }
};

Particle.prototype.render = function() {
    ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + rand( 50, 70 ) + '%, ' + rand( 20, 100 ) / 100 + ')';
    ctx.fillRect( this.x, this.y, this.width, this.height );
};

function createParticles() {
    var i = particleRate;
    while( i-- ) {
        this.particles.push( new Particle() );
    }
}

function updateParticles() {
    var i = particles.length;
    while( i-- ) {
        var p = particles[ i ];
        p.update( i );
    };
}

function renderParticles() {
    var i = particles.length;
    while( i-- ) {
        var p = particles[ i ];
        p.render();
    }
}

function clearCanvas() {
    ctx.clearRect( 0, 0, width, height );
}


function loop() {
    requestAnimationFrame( loop );
    clearCanvas();
    createParticles();
    updateLoader();
    updateParticles();
    renderLoader();
    renderParticles();
}

loop();

//加载动画效果--结束