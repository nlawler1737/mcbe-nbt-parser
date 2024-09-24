import { LONG_TAG_INFO } from "../constants";
import { getFixedPoint, setBytesFromFixedPoint } from "../utils";

export default class Long {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, Long.info.bytesLength);
  }

  get bytes(): Uint8Array {
    return this.#bytes;
  }

  get snbt(): string {
    return `${this.value}${Long.info.snbt}`;
  }

  get value(): bigint {
    const num = getFixedPoint(Long, this.#bytes);
    if (num === null) throw "Could not get value";
    return num;
  }

  set value(value: number | string) {
    setBytesFromFixedPoint(Long, value, this.#bytes);
  }

  static get info() {
    return LONG_TAG_INFO;
  }

  static fromSNBT(value: string) {
    throw "- Not Implemented";
  }
}
