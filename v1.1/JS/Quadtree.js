import Rectangle from './Rectangle.js';

function Quadtree(boundary, capacity) {
    const state = {
        boundary: boundary,
        capacity: capacity,
        points: [],
        northeast: null,
        northwest: null,
        southeast: null,
        southwest: null,
        divided: false
    };
    
    function insert(point){
        if(state.points.length < state.capacity) {
            state.points.push(point);
            return true;
        }
        else{
            if(!state.divided) subdivided();

            if(state.northwest.boundary.contains(point)) {
                return state.northwest.insert(point);
            }
            if(state.northeast.boundary.contains(point)) {
                return state.northeast.insert(point);
            }
            if(state.southwest.boundary.contains(point)) {
                return state.southwest.insert(point);
            }
            if(state.southeast.boundary.contains(point)) {
                return state.southeast.insert(point);
            }
        }
    }

    function query(range, found) {
        if(state.boundary.intersects(range)) {
            for(const p of state.points) {
                if(range.contains(p))
                    found.push(p);
            }

            if(state.divided) {
                state.northeast.query(range, found);
                state.northwest.query(range, found);
                state.southeast.query(range, found);
                state.southwest.query(range, found);
            }
        }
    }

    function subdivided(){
        const x = state.boundary.x;
        const y = state.boundary.y;
        const w = state.boundary.w;
        const h = state.boundary.h;

        const nw = Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        const ne = Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        const sw = Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        const se = Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

        state.northwest = Quadtree(nw, state.capacity);
        state.northeast = Quadtree(ne, state.capacity);
        state.southwest = Quadtree(sw, state.capacity);
        state.southeast = Quadtree(se, state.capacity);

        state.divided = true;
    }

    function show(context){
        state.boundary.show(context, '#FFF');

        for(const p of state.points)
            p.show(context, '#FFF');

        if(state.divided){
            state.northwest.show(context);
            state.northeast.show(context);
            state.southwest.show(context);
            state.southeast.show(context);
        }
    }

    return {
        boundary: state.boundary,
        insert,
        query,
        show,
    };
}

export default Quadtree;