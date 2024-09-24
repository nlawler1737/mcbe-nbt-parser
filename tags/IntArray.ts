import { INT_ARRAY_TAG_INFO } from "../constants";
import Int from "./Int";

export default class IntArray {
  #entries: Int[] = [];
  constructor(bytes: Uint8Array) {
    const lengthInt = new Int(bytes.slice(0, 4));
    const arr: Int[] = [];
    for (let i = 0; i < lengthInt.value; i++) {
      const entry = new Int(
        bytes.slice(4 + IntArray.info.childBytesLength * i)
      );
      arr.push(entry);
    }
    this.#entries = arr;
  }

  get bytes(): Uint8Array {
    const arr = new Uint8Array(
      4 + IntArray.info.childBytesLength * this.#entries.length
    );
    const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    dv.setInt16(0, this.#entries.length);
    for (let i = 0; i < this.#entries.length; i++) {
      const entry = this.#entries[i];
      arr.set(entry!.bytes, 4 + IntArray.info.childBytesLength * i);
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
    return INT_ARRAY_TAG_INFO;
  }
}
