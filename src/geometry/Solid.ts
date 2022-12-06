import { BufferGeometry, Float32BufferAttribute } from 'three';
import { Side } from './side'

export class Solid {
  sides: Side[];

  constructor(sides: Side[]) {
    this.sides = sides;
  }

  toThreeGeometry(): BufferGeometry {
    const geometry = new BufferGeometry();
    const vertices = new Float32Array(
      this.sides.flatMap((side) => side.vertices())
    );
    const normals = new Float32Array(
      this.sides.flatMap((side) => side.normal.toArray())
    )

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    return geometry;
  }
}