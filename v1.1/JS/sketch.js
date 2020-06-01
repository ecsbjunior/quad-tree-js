import Point from './Point.js';
import Rectangle from './Rectangle.js';
import Quadtree from './Quadtree.js';

const screen = document.getElementById('screen');
const context = screen.getContext('2d');

screen.width = 1100;
screen.height = 800;

const boundary = Rectangle(screen.width / 2, screen.height / 2, screen.width, screen.height);
const qtree = Quadtree(boundary, 4);


for(let i = 0; i < 400; i++){
    const x = Math.floor(Math.random() * screen.width);
    const y = Math.floor(Math.random() * screen.height);
    const p = Point(x, y);

    qtree.insert(p);
}

context.fillStyle = '#000';
context.fillRect(0, 0, screen.width, screen.height);
qtree.show(context);

function getMousePos(event) {
    const rect = screen.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

screen.addEventListener('mousemove', function draw(event) {
    const mouse = getMousePos(event);
    const preview = document.getElementById('points-preview');
    const range = new Rectangle(
        mouse.x,
        mouse.y,
        75,
        75
    );
    const points = [];

    qtree.query(range, points);
    
    preview.innerHTML = "";
    context.fillStyle = '#000';
    context.fillRect(0, 0, screen.width, screen.height);
    qtree.show(context);
    range.show(context, '#0ec7cd');
    for(const p of points) {
        p.show(context, '#6181ff');
        const elem = document.createElement('p');
        elem.innerHTML = `(${p.x}, ${p.y})`;
        preview.appendChild(elem);
    }
});