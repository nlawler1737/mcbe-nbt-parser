import { BYTE_TAG_INFO } from "../constants";
import { NbtNumberInfo } from "../types";
import { getFixedPoint, setBytesFromFixedPoint } from "../utils";

export default class Byte {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, Byte.info.bytesLength);
  }

  get bytes() {
    return this.#bytes;
  }

  get snbt() {
    return `${this.value}${Byte.info.snbt}`;
  }

  get value() {
    const num = getFixedPoint(Byte, this.#bytes);
    if (num === null) throw "Could not get value";
    return num;
  }

  set value(value: number | string) {
    setBytesFromFixedPoint(Byte, value, this.#bytes);
  }

  static get info(): NbtNumberInfo {
    return BYTE_TAG_INFO;
  }

  static fromSNBT(value: string) {
    const num = parseInt(value);
    if (Number.isNaN(num)) throw "Invalid Byte";
    if (num < this.info.intMin || num > this.info.intMax) {
      throw "Byte Out of Range";
    }
    const arr = new Uint8Array(1);
    arr[0] = num;
    return new this(arr);
  }
}
