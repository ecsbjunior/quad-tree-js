function Rectangle(x, y, w, h) {
    const state = {
        x: x,
        y: y,
        w: w,
        h: h
    };

    function contains(point) {
        return point.x >= state.x - state.w && point.x <= state.x + state.w &&
               point.y >= state.y - state.h && point.y <= state.y + state.h;
    }

    function intersects(range) {
        return !(
            range.x - range.w > state.x + state.w ||
            range.x + range.w < state.x - state.w ||
            range.y - range.h > state.y + state.h ||
            range.y + range.h < state.y - state.h
        ); 
    }

    function show(context, color) {
        context.strokeStyle = color;
        const rectangle = new Path2D();
        rectangle.rect(state.x - state.w, state.y - state.h, state.w * 2, state.h * 2);
        context.stroke(rectangle);
    }

    return {
        x: state.x,
        y: state.y,
        w: state.w,
        h: state.h,
        contains,
        intersects,
        show
    };
}

export default Rectangle;