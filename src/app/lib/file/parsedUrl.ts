import { URL } from 'url';
/**
 *
 * @param url http://localhost:5000/uploads/user-1728138253070.png, take this type of url to delete any files.
 * This will convert the URL to the only file name where it located like this: /uploads/user-1728138.png
 * @returns
 */
const parsedURL = (url: string): string => {
  const parsedUrl = new URL(url);
  let path = parsedUrl.pathname;

  // Convert forward slashes to backslashes
  path = path.replace(/\//g, '\\');

  // Remove leading backslash
  if (path.startsWith('\\')) {
    path = path.substring(1);
  }

  return path;
};

export default parsedURL;
