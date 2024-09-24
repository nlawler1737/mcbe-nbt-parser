import { FLOAT_TAG_INFO } from "../constants";

export default class Float {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, Float.info.bytesLength);
  }

  get bytes() {
    return this.#bytes;
  }

  get value() {
    return this.#bytesToFloatOrDouble(this.#bytes)
      .toFixed(45)
      .replace(/.?0*$/, "");
  }

  set value(e) {
    throw "- Not Implemented";
  }

  #bytesToFloatOrDouble(bytes: Uint8Array): number {
    let dataView = new DataView(
      bytes.buffer,
      bytes.byteOffset,
      bytes.byteLength
    );

    return bytes.length === 4
      ? dataView.getFloat32(0, true)
      : bytes.length === 8
      ? dataView.getFloat64(0, true)
      : 0;
  }

  static get info() {
    return FLOAT_TAG_INFO;
  }
}
