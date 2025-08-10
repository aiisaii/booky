/**
 * @typedef {'standard' | 'people' | 'torrent'} BookmarkType
 */

/**
 * @typedef {object} Bookmark
 * @property {number} id
 * @property {BookmarkType} type
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {string[]} tags
 * @property {string} notes
 * @property {string} previewImage
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {object} People
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} bio
 * @property {Object<string, string>} socialLinks - e.g., { twitter: 'url', github: 'url' }
 * @property {string[]} tags
 * @property {string} notes
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * @typedef {object} Torrent
 * @property {number} id
 * @property {string} magnetLink
 * @property {string} torrentFile - path or blob
 * @property {string} name
 * @property {number} size
 * @property {string[]} files
 * @property {number} seeders
 * @property {number} leechers
 * @property {string[]} tags
 * @property {string} notes
 * @property {number} createdAt
 * @property {number} updatedAt
 */

// This file doesn't export anything. It's for type definitions.
// In a JS project, you can use JSDoc to get some of the benefits of TypeScript.
// For example, in VS Code, you can get IntelliSense for these types.
// e.g. /** @type {import('./shared/types').Bookmark} */
// const myBookmark = {...};
