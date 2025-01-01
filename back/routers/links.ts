import express from 'express';
import Link from '../models/Link';
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const linksRouter = express.Router();

linksRouter.get('/', async (req, res, next) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (error) {
    next(error);
  }
});

linksRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const oneLink = await Link.find({ shortUrl: id });
    if (!oneLink) {
      res.status(404).json({ error: 'No link Found' });
    }
    console.log(oneLink[0].originalUrl);
    res.status(301).redirect(`${oneLink[0].originalUrl}`);
  } catch (error) {
    next(error);
  }
});

linksRouter.post('/', async (req, res, next) => {
  let uniqueUrl;

  while (!uniqueUrl) {
    let randomUrl = '';
    for (let i = 0; i < 6; i++) {
      let randomAlp = Math.floor(Math.random() * alphabet.length);
      randomUrl += Math.floor(Math.random() * 2)
        ? alphabet[randomAlp].toLowerCase()
        : alphabet[randomAlp].toUpperCase();
    }
    const link = await Link.find({ shortUrl: randomUrl });
    if (link.length === 0) {
      uniqueUrl = randomUrl;
      break;
    }
  }

  console.log(uniqueUrl);

  const newLink = {
    shortUrl: uniqueUrl,
    originalUrl: req.body.originalUrl,
  };

  try {
    const link = new Link(newLink);
    await link.save();
    res.status(200).send(link);
  } catch (error) {
    next(error);
  }
});

export default linksRouter;
