import { Side } from './side'

export class Solid {
  sides: Side[];

  constructor(sides: Side[]) {
    this.sides = sides;
  }
}