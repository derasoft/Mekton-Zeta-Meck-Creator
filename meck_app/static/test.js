"use strict";

let foo = document.createElement('canvas')
document.body.appendChild(foo)

let ctx = foo.getContext('2d')
ctx.lineWidth = 2;

ctx.beginPath();
ctx.arc(50,50,10,0,Math.Pi)
ctx.arc(50,50,10,Math.PI,2*Math.PI)
ctx.closePath();
ctx.stroke();