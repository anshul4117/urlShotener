import express from 'express';
import { urlShorter, redirectToOriginalUrl, getAllUrls, urlsStats } from '../controller/urlcontroller.js';

const router = express.Router();


router.post('/short', urlShorter);
// Use GET for redirection so visiting the short URL in a browser works
router.get('/:shortCode', redirectToOriginalUrl);

router.get('/stats/:shortCode', urlsStats);
router.get('/', getAllUrls);

export default router;

