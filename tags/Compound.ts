import { COMPOUND_TAG_INFO } from "../constants";
import { NbtCoreTag, TypeofNbtCoreTag, TypeofNbtTag } from "../types";
import { tagFromId } from "../utils";
import End from "./End";
import Str from "./String";
import Tag from "./Tag";

export default class Compound {
  #entries: Array<{ key: Str; payload: NbtCoreTag }> = [];
  constructor(bytes: Uint8Array) {
    let i = 0;
    while (bytes[i] !== 0 && bytes[i] !== undefined) {
      const tagId = bytes.slice(i, i + 1)[0];
      if (i >= bytes.length)
        throw new Error(
          "Overflow of stored payload length; ie. The length of the payload does not match the stored length"
        );
      if (tagId == null) throw new Error("Invalid tag id of " + tagId);
      if (tagId === 0) {
        i++;
        break;
      }
      const key = new Str(bytes.slice(i + 1));
      const tag = tagFromId(tagId) as TypeofNbtCoreTag;
      if (tag == null) throw new Error("Invalid tag id of " + tagId);
      const value = new tag(bytes.slice(i + 1 + key.bytes.length));
      this.#entries.push({
        key,
        payload: value,
      });
      // add 1 for the tagId
      i += 1 + key.bytes.length + value.bytes.length;
    }
  }

  get bytes(): Uint8Array {
    let bytesLength = 1; // add 1 for the end tag
    const bytes: Uint8Array[] = [];
    for (const entry of this.#entries) {
      if (entry instanceof End) {
        bytesLength += 1;
        break;
      }

      const key = entry.key;
      const keyBytes = key.bytes;
      const payload = entry.payload;
      const payloadBytes = payload.bytes;
      const tagId = (payload.constructor as TypeofNbtTag).info.tagId;
      bytes.push(new Uint8Array([tagId]), keyBytes, payloadBytes);
      bytesLength += 1 + keyBytes.length + payloadBytes.length;
    }
    const arr = new Uint8Array(bytesLength);
    for (let i = 0, j = 0; i < bytes.length; i++) {
      arr.set(bytes[i]!, j);
      j += bytes[i]!.length;
    }
    arr.set([0], bytesLength - 1);
    return arr;
  }
  get entries() {
    return [...this.#entries];
  }

  addEntry(string: string | Str, tag: Tag) {
    throw "- Not Implemented";
  }

  get(key: string | Str) {
    const keyStr = key instanceof Str ? key.value : key;
    return this.#entries.find((entry) => entry.key.value === keyStr)?.payload;
  }

  static get info() {
    return COMPOUND_TAG_INFO;
  }

  #getTagHeader(bytes: Uint8Array): { tagId: number; key?: Str } {
    let tagId = bytes.slice(0, 1)[0];
    if (!tagId) throw "Invalid Tag";
    if (tagId === 0) return { tagId: tagId };
    let key = new Str(bytes);
    return {
      tagId,
      key,
    };
  }
}
