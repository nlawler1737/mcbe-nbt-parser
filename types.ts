import {
  BYTE_TAG_INFO,
  SHORT_TAG_INFO,
  INT_TAG_INFO,
  LONG_TAG_INFO,
  FLOAT_TAG_INFO,
  DOUBLE_TAG_INFO,
  BYTE_ARRAY_TAG_INFO,
  STRING_TAG_INFO,
  LIST_TAG_INFO,
  COMPOUND_TAG_INFO,
  INT_ARRAY_TAG_INFO,
  LONG_ARRAY_TAG_INFO,
} from "./constants";
import Byte from "./tags/Byte";
import ByteArray from "./tags/ByteArray";
import Compound from "./tags/Compound";
import Double from "./tags/Double";
import End from "./tags/End";
import Float from "./tags/Float";
import Int from "./tags/Int";
import IntArray from "./tags/IntArray";
import List from "./tags/List";
import Long from "./tags/Long";
import LongArray from "./tags/LongArray";
import Short from "./tags/Short";
import Str from "./tags/String";

export enum ByteLength {
  BYTE = 1,
  SHORT = 2,
  INT = 4,
  LONG = 8,
  FLOAT = 4,
  DOUBLE = 8,
}

export type TagInfo = {
  tagId: number;
  snbt: string;
  bytesLength?: number;
  max?: number;
  min?: number;
} | null;

export type NbtNumberInfo =
  | typeof BYTE_TAG_INFO
  | typeof SHORT_TAG_INFO
  | typeof INT_TAG_INFO
  | typeof LONG_TAG_INFO
  | typeof FLOAT_TAG_INFO
  | typeof DOUBLE_TAG_INFO;

export type NbtArrayInfo =
  | typeof BYTE_ARRAY_TAG_INFO
  | typeof INT_ARRAY_TAG_INFO
  | typeof LONG_ARRAY_TAG_INFO;

/** All tags types */
export type NbtTag =
  | End
  | Byte
  | Short
  | Int
  | Long
  | Float
  | Double
  | ByteArray
  | Str
  | List
  | Compound
  | IntArray
  | LongArray;

/** All tags except End */
export type NbtCoreTag = Exclude<NbtTag, End>;

/** All tags that contain other tags */
export type NbtContainerTag =
  | ByteArray
  | IntArray
  | LongArray
  | List
  | Compound;

/** All tags except End and tags that contain other tags */
export type NbtPrimitiveTag = Exclude<NbtTag, NbtContainerTag | End>;

export type TypeofNbtTag =
  | typeof End
  | typeof Byte
  | typeof Short
  | typeof Int
  | typeof Long
  | typeof Float
  | typeof Double
  | typeof ByteArray
  | typeof Str
  | typeof List
  | typeof Compound
  | typeof IntArray
  | typeof LongArray;

export type TypeofNbtCoreTag = Exclude<TypeofNbtTag, typeof End>;

export type TypeofFixedPoint =
  | typeof Byte
  | typeof Short
  | typeof Int
  | typeof Long;

export type TypeofFloatingPoint = typeof Float | typeof Double;

export type TypeofArrayOrList =
  | typeof ByteArray
  | typeof IntArray
  | typeof LongArray
  | typeof List;
