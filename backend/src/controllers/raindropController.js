const raindropService = require('../services/raindropService');
const db = require('../config/db');

// Syncs bookmarks from Raindrop.io to the local database
exports.syncRaindrops = async (req, res) => {
    try {
        const raindrops = await raindropService.getRaindrops();

        // Basic sync: add new raindrops to local db
        const sql = `
            INSERT INTO bookmarks (type, title, standard_data, created_at, updated_at)
            VALUES ('standard', ?, ?, ?, ?)
            ON CONFLICT(title) DO NOTHING; -- A more robust solution would check URL
        `;

        let newCount = 0;
        for (const drop of raindrops) {
            const standard_data = JSON.stringify({ url: drop.link, description: drop.excerpt });
            db.run(sql, [drop.title, standard_data, drop.created, drop.lastUpdate], function(err) {
                if (err) {
                    console.error('Error inserting raindrop:', err.message);
                }
                if (this.changes > 0) {
                    newCount++;
                }
            });
        }

        res.json({ message: 'Sync with Raindrop.io complete.', newItems: newCount });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
