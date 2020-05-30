class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.x >= this.x - this.w && point.x <= this.x + this.w &&
               point.y >= this.y - this.h && point.y <= this.y + this.h;
    }
}

class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }
    
    insert(point){
        if(this.points.length < this.capacity) {
            this.points.push(point);
        }
        else{
            if(!this.divided) this.subdivided();

            if(this.northwest.boundary.contains(point))
                return this.northwest.insert(point);
            if(this.northeast.boundary.contains(point))
                return this.northeast.insert(point);
            if(this.southwest.boundary.contains(point))
                return this.southwest.insert(point);
            if(this.southeast.boundary.contains(point))
                return this.southeast.insert(point);
        }
    }

    subdivided(){
        const x = this.boundary.x;
        const y = this.boundary.y;
        const w = this.boundary.w;
        const h = this.boundary.h;

        const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;
    }

    show(context){
        context.strokeStyle = '#FFFFFF';
        const rectangle = new Path2D();
        rectangle.rect(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h, this.boundary.w * 2, this.boundary.h * 2);
        context.stroke(rectangle);

        context.fillStyle = '#FFF';
        for(const p of this.points){
            const circle = new Path2D();
            circle.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            context.fill(circle);
        }

        if(this.divided){
            this.northwest.show(context);
            this.northeast.show(context);
            this.southwest.show(context);
            this.southeast.show(context);
        }
    }
}