import { expect, it } from 'vitest'
import { assembleSolid, completeSide } from '../../src/io/vmf/geometry';
import { cube } from '../fixtures/cube'

it('should be able to complete a side', () => {
  completeSide(cube[0], cube)
})

it('should be able to assemble a solid', () => {
  const solid = assembleSolid(cube);
  console.log(solid);
})