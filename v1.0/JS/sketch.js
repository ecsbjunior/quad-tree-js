const screen = document.getElementById('screen');
const context = screen.getContext('2d');
let qtree = null;

function getMousePos(event) {
    const rect = screen.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
}

screen.addEventListener('mousemove', function draw(event) {
    const mouse = getMousePos(event);

    const range = new Rectangle(
        mouse.x,
        mouse.y,
        75,
        75
    );
    const points = [];

    qtree.query(range, points);
    
    context.fillStyle = '#000';
    context.fillRect(0, 0, screen.width, screen.height);
    qtree.show(context);
    range.show(context, '#00FF00');
    for(const p of points)
        p.show(context, '#FF0000');
});

function setup() {
    screen.width = 800;
    screen.height = 800;

    const boundary = new Rectangle(screen.width / 2, screen.height / 2, screen.width / 2, screen.height / 2);
    qtree = new QuadTree(boundary, 4);

    for(let i = 0; i < 200; i++){
        const x = Math.floor(Math.random() * screen.width);
        const y = Math.floor(Math.random() * screen.height);
        const p = new Point(x, y);

        qtree.insert(p);
    }

    context.fillStyle = '#000';
    context.fillRect(0, 0, screen.width, screen.height);
    qtree.show(context);
}
