import { LIST_TAG_INFO } from "../constants";
import { NbtCoreTag } from "../types";
import { getTagArray } from "../utils";
import Int from "./Int";
import Tag from "./Tag";

export default class List {
  #entries: NbtCoreTag[] = [];
  constructor(bytes: Uint8Array) {
    const childId = bytes.slice(0, 1)[0];
    this.#entries = getTagArray(
      this.constructor as typeof List,
      bytes.slice(1),
      childId
    ) as NbtCoreTag[];
  }

  get bytes(): Uint8Array {
    const firstChild = this.#entries[0];
    if (!firstChild) return new Uint8Array([0, 0, 0, 0, 0]);
    const firstChildConstructor = firstChild.constructor as typeof Tag;
    const childBytesLength = firstChildConstructor.info!.bytesLength;
    const arr = new Uint8Array(
      1 + 4 + firstChildConstructor.info!.bytesLength! * this.#entries.length
    );
    const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    dv.setUint8(0, firstChild ? firstChildConstructor.info!.tagId : 0);
    dv.setInt32(1, this.#entries.length);
    for (let i = 0; i < this.#entries.length; i++) {
      const entry = this.#entries[i];
      if (!entry) throw "Invalid Tag; Could not get bytes from List";
      arr.set(entry.bytes, 4 + childBytesLength! * i);
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
    return LIST_TAG_INFO;
  }
}
