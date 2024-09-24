import Byte from "./tags/Byte";
import ByteArray from "./tags/ByteArray";
import IntArray from "./tags/IntArray";
import Int from "./tags/Int";
import List from "./tags/List";
import Long from "./tags/Long";
import LongArray from "./tags/LongArray";
import NBT from "./tags/Nbt";
import Short from "./tags/Short";
import End from "./tags/End";
import Float from "./tags/Float";
import Double from "./tags/Double";
import Str from "./tags/String";
import Compound from "./tags/Compound";
import {
  NbtPrimitiveTag,
  NbtContainerTag,
  NbtTag,
  TypeofFixedPoint,
} from "./types";

export function decimalToBytes(num: number, bytesLength: number) {
  const buffer = new ArrayBuffer(bytesLength);
  const dataView = new DataView(buffer);
  dataView.setUint8(0, num);
  return new Uint8Array(buffer);
}

export function getDataView(bytes: Uint8Array) {
  const dv = new DataView(bytes.buffer);
  return dv;
}

export function getFixedPoint(
  tag: typeof Byte | typeof Short | typeof Int,
  bytes: Uint8Array
): number;
export function getFixedPoint(tag: typeof Long, bytes: Uint8Array): bigint;

export function getFixedPoint(tag: TypeofFixedPoint, bytes: Uint8Array) {
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  switch (tag) {
    case Byte:
      return dv.getUint8(0);
    case Short:
      return dv.getInt16(0, true);
    case Int:
      return dv.getInt32(0, true);
    case Long:
      return dv.getBigInt64(0, true);
    default:
      return null;
  }
}

export function setBytesFromFixedPoint(
  tag: TypeofFixedPoint,
  value: number | bigint | string,
  bytes: Uint8Array
) {
  if (Number.isNaN(value)) throw "Invalid Number";
  const num =
    typeof value === "bigint"
      ? value
      : +value > Int.info.intMax
      ? BigInt(+value)
      : +value;
  if (num < tag.info.intMin || num > tag.info.intMax) {
    throw "Number Out of Range";
  }
  const dv = new DataView(bytes.buffer);
  if (typeof num === "bigint") {
    dv.setBigInt64(0, num);
    return;
  }
  switch (tag) {
    case Byte:
      dv.setUint8(0, num);
      break;
    case Short:
      dv.setInt16(0, num);
      break;
    case Int:
      dv.setInt32(0, num);
      break;
    default:
  }
}

export function getTagArray(
  tag: typeof ByteArray,
  bytes: Uint8Array,
  childId?: undefined
): Byte[];
export function getTagArray(
  tag: typeof IntArray,
  bytes: Uint8Array,
  childId?: undefined
): Int[];
export function getTagArray(
  tag: typeof LongArray,
  bytes: Uint8Array,
  childId?: undefined
): Long[];
export function getTagArray(
  tag: typeof List,
  bytes: Uint8Array,
  childId?: number
): NbtTag[];

export function getTagArray(
  tag: typeof ByteArray | typeof IntArray | typeof LongArray | typeof List,
  bytes: Uint8Array,
  childId?: number
): NbtTag[] {
  const lengthTag = new Int(bytes.slice(0, 4));

  const { info: tagInfo } = tag;

  let correctTag = null;
  let tagBytesLength: number = tagInfo?.childBytesLength!;
  switch (tag) {
    case ByteArray:
      correctTag = Byte;
      break;
    case IntArray:
      correctTag = Int;
      break;
    case LongArray:
      correctTag = Long;
      break;
    case List:
      correctTag = NBT.tagFromId(childId!)?.type;
      tagBytesLength = 0;
      break;
  }

  const entries = [];
  for (let i = 0, j = 4; i < +lengthTag.value; i++, j += tagBytesLength) {
    const childTag = tagFromId(childId ?? tagInfo!.childId!);
    if (!childTag) throw "Invalid Tag";
    if (correctTag && childTag !== correctTag)
      throw "All tags must be the same type";
    const child = new childTag(bytes.slice(j));
    if (childTag === List) {
      tagBytesLength = child.bytes.length;
    }
    entries.push(child);
  }

  return entries;
}

export function tagFromId(id: number) {
  switch (id) {
    case 0:
      return End;
    case 1:
      return Byte;
    case 2:
      return Short;
    case 3:
      return Int;
    case 4:
      return Long;
    case 5:
      return Float;
    case 6:
      return Double;
    case 7:
      return ByteArray;
    case 8:
      return Str;
    case 9:
      return List;
    case 10:
      return Compound;
    case 11:
      return IntArray;
    case 12:
      return LongArray;
    default:
      return null;
  }
}

/**
 * Checks if the tag is a type of Array, Compound, or End
 * @param tag
 */
export function isContainerTag(tag: any): tag is NbtContainerTag {
  return (
    tag instanceof ByteArray ||
    tag instanceof IntArray ||
    tag instanceof LongArray ||
    tag instanceof List ||
    tag instanceof Compound
  );
}

/**
 * Checks if the tag is a base tag (ie. not a type of Array, Compound, or End)
 * @param tag
 */
export function isPrimitiveTag(tag: any): tag is NbtPrimitiveTag {
  return (
    tag instanceof Byte ||
    tag instanceof Short ||
    tag instanceof Int ||
    tag instanceof Long ||
    tag instanceof Float ||
    tag instanceof Double ||
    tag instanceof Str
  );
}
