import { expect, it } from 'vitest';
import { Vector } from '../../src/geometry/vector';

const vectorA = new Vector(0, 64, 0);
const vectorB = new Vector(0, 0, 64);

it('should be able to check if vectors are equal', () => {
  expect(vectorA.equals(vectorB)).toBe(false);
  expect(vectorA.equals(vectorA)).toBe(true);
})

it('should be able to add vectors', () => {
  expect(vectorA.add(vectorB)).toEqual(new Vector(0, 64, 64));
  expect(vectorB.add(vectorA)).toEqual(new Vector(0, 64, 64));
})

it('should be able to subtract vectors', () => {
  expect(vectorA.sub(vectorB)).toEqual(new Vector(0, 64, -64));
  expect(vectorB.sub(vectorA)).toEqual(new Vector(0, -64, 64));
})

it('should be able to compute the dot product', () => {
  expect(vectorA.dot(vectorB)).toEqual(0)
  expect(vectorA.dot(vectorA)).toEqual(4096)
})

it('should be able to compute the cross product', () => {
  expect(vectorA.cross(vectorB)).toEqual(new Vector(4096, 0, 0));
})

it('should be able to normalize vectors', () => {
  expect(vectorA.normalized()).toEqual(new Vector(0, 1, 0));
  expect(vectorB.normalized()).toEqual(new Vector(0, 0, 1));
  expect(new Vector(4, 3, 0).normalized()).toEqual(new Vector(0.8, 0.6, 0));
})