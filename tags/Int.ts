import { INT_TAG_INFO } from "../constants";
import { setBytesFromFixedPoint } from "../utils";

export default class Int {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, Int.info.bytesLength);
  }

  get bytes() {
    return this.#bytes;
  }

  get snbt() {
    return `${this.value}${Int.info.snbt}`;
  }

  get value(): number {
    const dv = new DataView(
      this.#bytes.buffer,
      this.#bytes.byteOffset,
      this.#bytes.byteLength
    );
    return dv.getInt32(0, true);
  }

  set value(value: number | string) {
    setBytesFromFixedPoint(Int, value, this.#bytes);
  }

  static get info() {
    return INT_TAG_INFO;
  }

  static fromSNBT(value: string) {
    throw "- Not Implemented";
  }
}
