const parseTorrent = require('parse-torrent');

/**
 * Parses a magnet link or a torrent file buffer.
 * @param {string | Buffer} torrentInput - The magnet link or torrent file buffer.
 * @returns {Promise<object>} A promise that resolves with the parsed torrent metadata.
 */
const parse = async (torrentInput) => {
  try {
    const torrent = await new Promise((resolve, reject) => {
      parseTorrent.remote(torrentInput, (err, parsedTorrent) => {
        if (err) return reject(err);
        resolve(parsedTorrent);
      });
    });

    return {
      name: torrent.name,
      infoHash: torrent.infoHash,
      length: torrent.length,
      files: torrent.files.map(file => ({
        path: file.path,
        name: file.name,
        length: file.length,
      })),
    };
  } catch (error) {
    console.error('Error parsing torrent:', error);
    throw new Error('Invalid torrent file or magnet link.');
  }
};

module.exports = {
  parse,
};
