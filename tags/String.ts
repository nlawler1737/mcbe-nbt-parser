import { STRING_TAG_INFO } from "../constants";
import Short from "./Short";

export default class Str {
  #length: Short;
  #bytes;
  constructor(bytes: Uint8Array) {
    this.#length = new Short(bytes);
    this.#bytes = bytes.slice(2, 2 + +this.#length.value);
  }

  get bytes() {
    const arr = new Uint8Array(2 + this.#bytes.length);
    const dv = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    dv.setUint16(0, +this.#length.value);
    arr.set(this.#bytes, 2);
    return arr;
  }
  get value(): string {
    return new TextDecoder("utf-8").decode(this.#bytes);
  }
  set value(string: string) {
    if (string.length > Short.info.uintMax) {
      throw "String cannot be longer than " + Short.info.uintMax;
    }
    this.#length.value = string.length;
    this.#bytes = new TextEncoder().encode(string);
  }

  #bytesToString(bytes: number[]): string {
    return [...bytes].map((e) => String.fromCharCode(e)).join("");
  }
  #stringToBytes(string: string): number[] {
    return string.split("").map((e) => e.charCodeAt(0));
  }

  static get info() {
    return STRING_TAG_INFO;
  }
}
