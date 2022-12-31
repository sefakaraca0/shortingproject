require("dotenv/config");
const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../database/url");

router.post("/shorten", async (req, res) => {
    const { longUrl } = req.body;
    console.log(req.body);
    const baseUrl = config.get("baseURI");

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid base url");
    }

    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + "/" + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode
                });

                await url.save();

                res.json(url);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long url");
    }
});

module.exports = router;