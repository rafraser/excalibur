// Side consists of:
// - Points
// - Normal
// - An ID - more important than you think..
import { Vector } from './Vector'
import { Earcut } from 'three/src/extras/Earcut'

export class Side {
  points: Vector[];
  normal: Vector;
  id: number;

  constructor(points: Vector[], normal: Vector) {
    this.points = points;
    this.normal = normal;
    this.id = 0;
  }

  vertices(): number[] {
    const verts = this.points.flatMap((point) => point.toArray());
    const tris = Earcut.triangulate(verts, [], 3) as unknown as number[];
    console.log(verts, tris);
    return tris
  }
}