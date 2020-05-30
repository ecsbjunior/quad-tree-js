function setup() {
    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');
    

    screen.width = 800;
    screen.height = 800;

    context.fillStyle = '#000';
    context.fillRect(0, 0, screen.width, screen.height);

    const boundary = new Rectangle(screen.width / 2, screen.height / 2, screen.width / 2, screen.height / 2);
    const qtree = new QuadTree(boundary, 4);

    for(let i = 0; i < 200; i++){
        const x = Math.floor(Math.random() * screen.width);
        const y = Math.floor(Math.random() * screen.height);
        const p = new Point(x, y);

        qtree.insert(p);
    }
 
    qtree.show(context);
}