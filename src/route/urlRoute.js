import express from 'express';
import { urlShorter, redirectToOriginalUrl } from '../controller/urlcontroller.js';

const router = express.Router();


router.post('/short', urlShorter);
// Use GET for redirection so visiting the short URL in a browser works
router.get('/:shortCode',redirectToOriginalUrl);

export default router;

