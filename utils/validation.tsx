import slugify from "slugify";
import xss from "xss";

/*------- ----------*/
// Clear Form Data Property
/*------- ----------*/
export const clearProperty = (value: FormDataEntryValue | null) =>
  !value ? "" : value.toString().trim();

/*------- ----------*/
// Validate Text Fields
/*------- ----------*/
export const isInvalidText = (text: string) => !text || text.trim() === "";

/*------- ----------*/
// Validate Email Field
/*------- ----------*/
export const isInvalidEmail = (email: string) =>
  !email.includes("@") && !email.includes(".");

/*------- ----------*/
// Validate Image File
/*------- ----------*/
export const isInvalidFile = (file: File) => !file || file.size === 0;

/*------- ----------*/
// Generate a URL-friendly slug from a string
/*------- ----------*/
export const generareSlug = (str: string) => slugify(str, { lower: true });

/*------- ----------*/
// Sanitize a string to prevent XSS attacks
/*------- ----------*/
export const sanitaze = (str: string) => xss(str);
