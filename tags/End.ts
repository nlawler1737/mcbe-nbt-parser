import { END_TAG_INFO } from "../constants";

export default class End {
  #bytes: Uint8Array;
  constructor(bytes: Uint8Array) {
    this.#bytes = bytes.slice(0, 1);
    if (this.#bytes[0] !== 0) throw "Invalid End";
  }
  get bytes() {
    return this.#bytes;
  }
  static get info() {
    return END_TAG_INFO;
  }
}
