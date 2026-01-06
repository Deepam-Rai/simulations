export function inCircle(x, y, diagram){
    // tests whether given point lies inside the circle or not
    const distance =  Math.pow(x - diagram.center.x, 2) +  Math.pow(y - diagram.center.y, 2);
    return distance <= Math.pow(diagram.radius, 2);
}

export function generatePoints(diagram){
    const size = diagram.radius * 2;
    // x, y in range [center - radius, center - radius + size)  => negligible error due to non-inclusivity
    const x = diagram.center.x - diagram.radius + Math.random() * size;
    const y = diagram.center.y - diagram.radius + Math.random() * size;
    return [x,y];
}