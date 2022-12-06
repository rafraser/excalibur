import { describe, expect, it } from 'vitest'
import { Vector } from '../../src/geometry/vector'
import { Plane, threePlaneIntersection } from '../../src/geometry/plane'

// This isn't centered at the origin, just to spice things up a little
const cube = [
  new Plane(new Vector(-128, 1152, 128), new Vector(128, 1152, 128), new Vector(128, 896, 128)),
  new Plane(new Vector(-128, 896, -128), new Vector(128, 896, -128), new Vector(128, 1152, -128)),
  new Plane(new Vector(-128, 1152, 128), new Vector(-128, 896, 128), new Vector(-128, 896, -128)),
  new Plane(new Vector(128, 1152, -128), new Vector(128, 896, -128), new Vector(128, 896, 128)),
  new Plane(new Vector(128, 1152, 128), new Vector(-128, 1152, 128), new Vector(-128, 1152, -128)),
  new Plane(new Vector(128, 896, -128), new Vector(-128, 896, -128), new Vector(-128, 896, 128)),
] as Plane[]

describe('Parsing', () => {
  it('can parse a simple plane', () => {
    const test = '(0 0 0) (0 0 64) (64 0 64)'
    const expected = new Plane(new Vector(0, 0, 0), new Vector(0, 0, 64), new Vector(64, 0, 64))
    expect(Plane.parseString(test)).toEqual(expected);
  })

  it('can parse an off-grid plane', () => {
    const test = '(-252.211 656 -128) (-252.665 714.183 -128) (-252.665 714.183 128)'
    const expected = new Plane(new Vector(-252.211, 656, -128), new Vector(-252.665, 714.183, -128), new Vector(-252.665, 714.183, 128))
    expect(Plane.parseString(test)).toEqual(expected);
  })

  it('can parse an off-axis plane', () => {
    const test = '(-128 1152 -128) (128 1152 -128) (128 896 128)'
    const expected = new Plane(new Vector(-128, 1152, -128), new Vector(128, 1152, -128), new Vector(128, 896, 128))
    expect(Plane.parseString(test)).toEqual(expected);
  })

  it('returns null when parsing an invalid plane', () => {
    expect(Plane.parseString('[1 2 3] [A B C]')).toEqual(null);
  })
})

it('can find the normal of planes', () => {
  expect(cube[0].normal()).toEqual(new Vector(0, 0, 1));
  expect(cube[1].normal()).toEqual(new Vector(0, 0, -1));
})

it('can find the intersection of three planes', () => {
  const p1 = cube[0];
  const p2 = cube[2];
  const p3 = cube[4];
  expect(threePlaneIntersection(p1, p2, p3)).toEqual(new Vector(-128, 1152, 128));
})