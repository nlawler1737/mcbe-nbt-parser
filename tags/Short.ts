import { SHORT_TAG_INFO } from "../constants";
import { getFixedPoint, setBytesFromFixedPoint } from "../utils";

export default class Short {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, Short.info.bytesLength);
  }

  get bytes() {
    return this.#bytes;
  }

  get snbt() {
    return `${this.value}${Short.info.snbt}`;
  }

  get value() {
    const num = getFixedPoint(Short, this.#bytes);
    if (num === null) throw "Could not get value";
    return num;
  }

  set value(value: number | string) {
    setBytesFromFixedPoint(Short, value, this.#bytes);
  }

  static get info() {
    return SHORT_TAG_INFO;
  }

  static fromSNBT(value: string) {
    throw "- Not Implemented";
  }
}
