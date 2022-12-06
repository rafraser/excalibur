import { Plane, threePlaneIntersection } from '../../geometry/Plane';
import { Side } from '../../geometry/Side';
import { Solid } from '../../geometry/Solid';
import { Vector } from '../../geometry/Vector';

export function completeSide(plane1: Plane, planes: Plane[]): Vector[] {
  const intersections = [] as Vector[];
  planes.forEach((plane2) => {
    planes.forEach((plane3) => {
      // TODO: Reduce the number of iterations here.. a lot of these are duplicate
      if (plane1.equals(plane2) || plane1.equals(plane3) || plane2.equals(plane3)) return;

      const intersection = threePlaneIntersection(plane1, plane2, plane3);
      if (!intersection) return;

      // TODO: Sanity check these results a bit better
      if (intersections.some((existingIntersection) => existingIntersection.equals(intersection))) return;
      intersections.push(intersection);
    })
  })

  // TODO: Sanity check the result - need at least three points
  // TODO: Possibly sort the points in a clockwise order
  // yeah there's a few things to do in this file but we're getting there!

  console.log(intersections);
  return intersections;
}

export function fromRawSolid(data: any): Solid {
  return assembleSolid(data['side'].map((side: any) => Plane.parseString(side.plane)));
}

export function assembleSolid(planes: Plane[]): Solid {
  const sides = planes.map((plane) => new Side(completeSide(plane, planes), plane.normal()))
  return new Solid(sides)
}