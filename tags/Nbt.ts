import Str from "./String";
import Compound from "./Compound";
import End from "./End";
import Byte from "./Byte";
import Short from "./Short";
import Int from "./Int";
import Long from "./Long";
import Float from "./Float";
import Double from "./Double";
import ByteArray from "./ByteArray";
import IntArray from "./IntArray";
import LongArray from "./LongArray";
import List from "./List";
import { NBT_HEADER_AND_KEY_BYTE_LENGTH, NBT_HEADER_BYTE_LENGTH, NBT_PAYLOAD_KEY_BYTE_LENGTH } from "../constants";

export default class NBT {
  #header: Uint8Array;
  #payload: Compound;

  constructor(buffer: ArrayBufferLike | Uint8Array) {
    const arr = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    this.#header = arr.slice(0, 4);
    this.#payload = new Compound(arr.slice(NBT_HEADER_AND_KEY_BYTE_LENGTH));
  }

  get head() {
    return this.#payload
  }

  get bytes(): Uint8Array {
    const payloadBytes = this.#payload.bytes;
    const arr = new Uint8Array(
      NBT_HEADER_AND_KEY_BYTE_LENGTH + payloadBytes.length
    );
    arr.set(this.#header, 0);
    arr.set(
      new Uint32Array([payloadBytes.length + NBT_PAYLOAD_KEY_BYTE_LENGTH]),
      NBT_HEADER_BYTE_LENGTH
    );
    arr.set([10, 0, 0], 8);
    arr.set(payloadBytes, NBT_HEADER_AND_KEY_BYTE_LENGTH); 
    return arr;
  }

  static tagFromId(id: number) {
    let ids = [
      this.end,
      this.byte,
      this.short,
      this.int,
      this.long,
      this.float,
      this.double,
      this.byteArray,
      this.string,
      this.list,
      this.compound,
      this.intArray,
      this.longArray,
    ];

    return ids[id];
  }

  static end = {
    id: 0,
    type: End,
    name: "end",
    bytes: 1,
  };
  static byte = {
    id: 1,
    type: Byte,
    name: "byte",
    bytes: 1,
  };
  static short = {
    id: 2,
    type: Short,
    name: "short",
    bytes: 2,
  };
  static int = {
    id: 3,
    type: Int,
    name: "int",
    bytes: 4,
  };
  static long = {
    id: 4,
    type: Long,
    name: "long",
    bytes: 8,
  };
  static float = {
    id: 5,
    type: Float,
    name: "float",
    bytes: 4,
  };
  static double = {
    id: 6,
    type: Double,
    name: "double",
    bytes: 8,
  };
  static string = {
    id: 8,
    type: Str,
    name: "string",
    bytes: 0,
  };
  static byteArray = {
    id: 7,
    type: ByteArray,
    name: "byteArray",
    bytes: 0,
  };
  static intArray = {
    id: 11,
    type: IntArray,
    name: "intArray",
    bytes: 0,
  };
  static longArray = {
    id: 12,
    type: LongArray,
    name: "longArray",
    bytes: 0,
  };
  static compound = {
    id: 10,
    type: Compound,
    name: "compound",
    bytes: 0,
  };
  static list = {
    id: 9,
    type: List,
    name: "list",
    bytes: 0,
  };
}
