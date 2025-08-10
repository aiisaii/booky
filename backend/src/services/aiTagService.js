const { pipeline } = require('@xenova/transformers');

class AITaggingPipeline {
    static task = 'text2text-generation';
    static model = 'Xenova/flan-t5-small';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

/**
 * Suggests tags for a given text.
 * @param {string} text - The text to generate tags for (e.g., title + description).
 * @returns {Promise<string[]>} A promise that resolves with an array of suggested tags.
 */
const suggestTags = async (text) => {
    try {
        console.log('Loading AI model for tag suggestion...');
        const generator = await AITaggingPipeline.getInstance();
        console.log('Model loaded. Generating tags...');

        const prompt = `Generate 5 comma-separated keywords or tags for the following text: "${text}"`;
        const output = await generator(prompt, {
            max_new_tokens: 50,
            num_beams: 2,
        });

        const tags = output[0].generated_text
            .split(',')
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0);

        console.log('Generated tags:', tags);
        return tags;

    } catch (error) {
        console.error('Error suggesting tags:', error);
        throw new Error('Failed to generate AI tags.');
    }
};

module.exports = {
    suggestTags,
};
