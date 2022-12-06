import { Vector } from './Vector'
import { Matrix3 } from 'three'

/*
Geometry in the .VMF format is represented as a series of planes
Planes are a little tricky to work with!
*/
export class Plane {
  a: Vector;
  b: Vector;
  c: Vector;

  constructor(a: Vector, b: Vector, c: Vector) {
    // This doesn't validate the three points forms a valid plane in the slightest
    // if it doesn't work out, it's your problem
    this.a = a;
    this.b = b;
    this.c = c;
  }

  static parseString(data: string): Plane | null {
    // TODO: THIS IS VERY BAD IMPLEMENTATION!
    // Replace this with some proper parsing later
    const PLANE_REGEX = /\((-?\d*.?\d*) (-?\d*.?\d*) (-?\d*.?\d*)\)/g
    const matches = [...data.matchAll(PLANE_REGEX)];
    if (matches.length !== 3) return null;

    const a = new Vector(parseFloat(matches[0][1]), parseFloat(matches[0][2]), parseFloat(matches[0][3]));
    const b = new Vector(parseFloat(matches[1][1]), parseFloat(matches[1][2]), parseFloat(matches[1][3]))
    const c = new Vector(parseFloat(matches[2][1]), parseFloat(matches[2][2]), parseFloat(matches[2][3]))
    return new Plane(a, b, c);
  }

  equals(other: Plane): boolean {
    if (!other) return false;
    return this.a.equals(other.a) && this.b.equals(other.b) && this.c.equals(other.c);
  }

  normal(): Vector {
    // Note that .sub and .add are in place operations in THREE
    // This caused me no end of strife so i'm making new vectors here to save my sanity
    const u = this.a.sub(this.b);
    const v = this.c.sub(this.b);
    return u.cross(v).normalized();
  }

  center(): Vector {
    return this.a.add(this.b).add(this.c).multiplyScalar(1/3);
  }

  distance(): number {
    const n = this.normal();
    return this.normal().dot(this.a);
  }
}

export function threePlaneIntersection(plane1: Plane, plane2: Plane, plane3: Plane): Vector | null {
  // special thanks to https://mathworld.wolfram.com/Plane-PlaneIntersection.html
  const normal1 = plane1.normal();
  const normal2 = plane2.normal();
  const normal3 = plane3.normal();

  const determinant = new Matrix3().set(
    normal1.x, normal1.y, normal1.z,
    normal2.x, normal2.y, normal2.z,
    normal3.x, normal3.y, normal3.z
  ).determinant();

  // Determinant 0 = parallel planes = no intersection
  if (determinant === 0 || isNaN(determinant)) {
    return null;
  }

  // alt: plane1.a.dot(normal1) ?
  const x1 = normal2.cross(normal3).multiplyScalar(plane1.distance());
  const x2 = normal3.cross(normal1).multiplyScalar(plane2.distance());
  const x3 = normal1.cross(normal2).multiplyScalar(plane3.distance());
  const vec = x1.add(x2).add(x3);
  return new Vector(vec.x / determinant, vec.y / determinant, vec.z / determinant);
}