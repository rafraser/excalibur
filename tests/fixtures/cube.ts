import { Vector } from '../../src/geometry/vector'
import { Plane } from '../../src/geometry/plane'

// This isn't centered at the origin, just to spice things up a little
export const cube = [
  new Plane(new Vector(-128, 1152, 128), new Vector(128, 1152, 128), new Vector(128, 896, 128)),
  new Plane(new Vector(-128, 896, -128), new Vector(128, 896, -128), new Vector(128, 1152, -128)),
  new Plane(new Vector(-128, 1152, 128), new Vector(-128, 896, 128), new Vector(-128, 896, -128)),
  new Plane(new Vector(128, 1152, -128), new Vector(128, 896, -128), new Vector(128, 896, 128)),
  new Plane(new Vector(128, 1152, 128), new Vector(-128, 1152, 128), new Vector(-128, 1152, -128)),
  new Plane(new Vector(128, 896, -128), new Vector(-128, 896, -128), new Vector(-128, 896, 128)),
] as Plane[]