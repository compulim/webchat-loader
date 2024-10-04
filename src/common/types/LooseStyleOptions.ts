import { boolean, number, record, string, union, type InferOutput } from 'valibot';

const looseStyleOptionsSchema = record(string(), union([boolean(), number(), string()]));
type LooseStyleOptions = InferOutput<typeof looseStyleOptionsSchema>;

export { looseStyleOptionsSchema, type LooseStyleOptions };
