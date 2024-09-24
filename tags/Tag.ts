import { TagInfo } from "../types";

export default class Tag {
  get bytes(): Uint8Array {
    throw "Not Implemented";
    return new Uint8Array(0);
  }
  get snbt(): string {
    throw "Not Implemented";
  }
  toString(): string {
    return this.snbt;
  }
  static get info(): TagInfo {
    return null;
  }
}
