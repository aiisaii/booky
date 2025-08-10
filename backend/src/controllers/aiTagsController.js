const aiTagService = require('../services/aiTagService');

exports.suggestTags = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required to suggest tags.' });
    }

    try {
        const tags = await aiTagService.suggestTags(text);
        res.json({ data: tags });
    } catch (error) {
        res.status(500).json({ error: 'Failed to suggest tags.' });
    }
};
