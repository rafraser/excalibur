/*
THREE's Vector3 operations are in-place... I'm not a fan of that
This class is a simple 3D vector implementation that doesn't perform operations in-place
*/
export class Vector {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(other: Vector): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    )
  }

  dot(other: Vector): number {
    return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
  }

  length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }

  normalized(): Vector {
    const l = this.length() || 1;
    return new Vector(this.x / l, this.y / l, this.z / l);
  }

  multiplyScalar(val: number): Vector {
    return new Vector(this.x * val, this.y * val, this.z * val);
  }
}