import { z } from "zod";

// creatin an schema for string
const mySchema = z.string();

// parsing
try {
  mySchema.parse("Zoth"); // => "Zoth"
  mySchema.parse(30); // => throws ZodError
} catch (err) {
  // console.log(err);
}

// safe parsing doesn't throw an error when parsin had failed
mySchema.safeParse("Zoth"); // => { success: true, data: "Dave" }
mySchema.safeParse(30); // => { success: false, error: ZodError }

// coerce will coersing parsed element to a parse type
const schema = z.coerce.string();
schema.parse("Zoth"); // => "Zoth"
schema.parse(30); // => "30"
schema.parse(true); // => "true"
