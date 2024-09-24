export const END_TAG_INFO = {
  name: "end",
  tagId: 0,
  snbt: "",
  bytesLength: 1,
} as const;

export const BYTE_TAG_INFO = {
  name: "byte",
  tagId: 1,
  snbt: "b",
  bytesLength: 1,
  uintMin: 0,
  uintMax: 255,
  intMin: -128,
  intMax: 127,
} as const;

export const SHORT_TAG_INFO = {
  name: "short",
  tagId: 2,
  snbt: "s",
  bytesLength: 2,
  uintMin: 0,
  uintMax: 65535,
  intMin: -32768,
  intMax: 32767,
} as const;

export const INT_TAG_INFO = {
  name: "int",
  tagId: 3,
  snbt: "i",
  bytesLength: 4,
  uintMin: 0,
  uintMax: 4294967295,
  intMin: -2147483648,
  intMax: 2147483647,
} as const;

export const LONG_TAG_INFO = {
  name: "long",
  tagId: 4,
  snbt: "l",
  bytesLength: 8,
  uintMin: 0n,
  uintMax: 18446744073709551615n,
  intMin: -9223372036854775808n,
  intMax: 9223372036854775807n,
} as const;

export const FLOAT_TAG_INFO = {
  name: "float",
  tagId: 5,
  snbt: "f",
  bytesLength: 4,
  uintMin: 0,
  uintMax: 3.4e38,
  intMin: -3.4e38,
  intMax: 3.4e38,
} as const;

export const DOUBLE_TAG_INFO = {
  name: "double",
  tagId: 6,
  snbt: "d",
  bytesLength: 8,
  uintMin: 0,
  uintMax: 1.7e308,
  intMin: -1.7e308,
  intMax: 1.7e308,
} as const;

export const BYTE_ARRAY_TAG_INFO = {
  name: "byteArray",
  tagId: 7,
  snbt: "",
  childId: 1,
  childBytesLength: 1,
} as const;

export const STRING_TAG_INFO = {
  name: "string",
  tagId: 8,
  snbt: "",
} as const;

export const LIST_TAG_INFO = {
  name: "list",
  tagId: 9,
  snbt: "",
  childId: null,
  childBytesLength: null,
} as const;

export const COMPOUND_TAG_INFO = {
  name: "compound",
  tagId: 10,
  snbt: "",
} as const;

export const INT_ARRAY_TAG_INFO = {
  name: "intArray",
  tagId: 11,
  snbt: "",
  childId: 3,
  childBytesLength: 4,
} as const;

export const LONG_ARRAY_TAG_INFO = {
  name: "longArray",
  tagId: 12,
  snbt: "",
  childId: 4,
  childBytesLength: 8,
} as const;

/** 8 0 0 0 */
export const NBT_HEADER_BYTE_LENGTH = 4;
/** 0 0 0 0 */
export const NBT_PAYLOAD_LENGTH_BYTE_LENGTH = 4;
/** 10 0 0 */
export const NBT_PAYLOAD_KEY_BYTE_LENGTH = 3;

export const NBT_HEADER_AND_KEY_BYTE_LENGTH =
  NBT_HEADER_BYTE_LENGTH +
  NBT_PAYLOAD_LENGTH_BYTE_LENGTH +
  NBT_PAYLOAD_KEY_BYTE_LENGTH;
