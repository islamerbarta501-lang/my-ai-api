const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    const userMsg = req.query.msg;
    if (!userMsg) return res.send("No message provided!");

    try {
        // আমরা Pollinations AI ব্যবহার করছি কারণ এটি ইমোজি ও বাংলায় সেরা
        const response = await axios.get(`https://text.pollinations.ai/${encodeURIComponent(userMsg)}?model=openai&system=You are a helpful assistant. Reply in Bengali with emojis.`);
        
        // আপনার নিজের এপিআই ফরমেট
        res.json({
            status: "success",
            message: response.data
        });
    } catch (error) {
        res.json({ status: "error", message: "API Error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
