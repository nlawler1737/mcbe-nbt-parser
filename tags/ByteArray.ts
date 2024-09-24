import { BYTE_ARRAY_TAG_INFO } from "../constants";
import { getTagArray } from "../utils";
import Byte from "./Byte";

export default class ByteArray {
  #entries: Byte[] = [];
  constructor(bytes: Uint8Array) {
    this.#entries = getTagArray(ByteArray, bytes);
  }

  get bytes(): Uint8Array {
    const arr = new Uint8Array(
      4 + ByteArray.info.childBytesLength * this.#entries.length
    );
    const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    dv.setInt16(0, this.#entries.length);
    for (let i = 0; i < this.#entries.length; i++) {
      const entry = this.#entries[i];
      arr.set(entry!.bytes, 4 + ByteArray.info.childBytesLength * i);
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
    return BYTE_ARRAY_TAG_INFO;
  }
}
