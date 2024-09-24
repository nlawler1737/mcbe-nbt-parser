import { LONG_ARRAY_TAG_INFO } from "../constants";
import { getTagArray } from "../utils";
import Long from "./Long";

export default class LongArray {
  #entries: Long[] = [];
  constructor(bytes: Uint8Array) {
    this.#entries = getTagArray(LongArray, bytes);
  }

  get bytes(): Uint8Array {
    const arr = new Uint8Array(
      4 + LongArray.info.childBytesLength * this.#entries.length
    );
    const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    dv.setInt16(0, this.#entries.length);
    for (let i = 0; i < this.#entries.length; i++) {
      const entry = this.#entries[i];
      arr.set(entry!.bytes, 4 + LongArray.info.childBytesLength * i);
    }
    return arr;
  }
  get entries() {
    return [...this.#entries];
  }
  set entries(e) {
    throw "- Not Implemented";
  }
  static get info() {
    return LONG_ARRAY_TAG_INFO;
  }
}
