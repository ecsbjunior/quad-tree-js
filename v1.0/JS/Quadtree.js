class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show(context, color) {
        context.fillStyle = color;
        const circle = new Path2D();
        circle.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        context.fill(circle);
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

    intersects(range) {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        ); 
    }

    show(context, color) {
        context.strokeStyle = color;
        const rectangle = new Path2D();
        rectangle.rect(this.x - this.w, this.y - this.h, this.w * 2, this.h * 2);
        context.stroke(rectangle);
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

    query(range, found) {
        if(this.boundary.intersects(range)) {
            for(const p of this.points) {
                if(range.contains(p))
                    found.push(p);
            }

            if(this.divided) {
                this.northeast.query(range, found);
                this.northwest.query(range, found);
                this.southeast.query(range, found);
                this.southwest.query(range, found);
            }
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
        this.boundary.show(context, '#FFF');

        for(const p of this.points)
            p.show(context, '#FFF');

        if(this.divided){
            this.northwest.show(context);
            this.northeast.show(context);
            this.southwest.show(context);
            this.southeast.show(context);
        }
    }
}