function Point(x, y) {
    const state = {
        x: x,
        y: y
    };

    function show(context, color) {
        context.fillStyle = color;
        const circle = new Path2D();
        circle.arc(state.x, state.y, 2, 0, 2 * Math.PI);
        context.fill(circle);
    }

    return {
        x: state.x,
        y: state.y,
        show
    };
}

export default Point;