import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { getBaseUrl, getShortCode, verifyProtocal } from '../utils/urlUtils.js';
import Url from '../model/url.js'

const urlShorter = async (req, res) => {
    try {
        const { originalUrl, customCode, expiresAt } = req.body;
        if (!originalUrl) {
            throw new ApiError(400, 'Original URL is required',);
        }

        const urlWithProtocal = verifyProtocal(originalUrl);

        let shortCode = customCode || getShortCode();

        if (customCode) {
            const existingurl = await Url.findOne({ shortCode: customCode });
            if (existingurl) {
                throw new ApiError(400, 'Custome short code already exists');
            }
        }

        const Baseurl = getBaseUrl(req);
        const shortUrl = `${Baseurl}/api/urls/${shortCode}`;

        const newUrl = new Url({
            orgURL: urlWithProtocal,
            shortCode,
            shortURL: shortUrl,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
        });

        await newUrl.save();

        return res.status(201).json(
            new ApiResponse(200, newUrl, 'URL shortened successfully')
        );
    } catch (error) {
        // console.log(error.message);
        throw new ApiError(500, 'URL shortening failed', error);
    }
}

const redirectToOriginalUrl = async (req, res) => {
    const { shortCode } = req.params;
    try {
        console.log("code : ",shortCode);
        const urlEntry = await Url.findOne({
            shortCode,
            isActive: true,
        });
        if (!urlEntry) {
            throw new ApiError(404, "Short Url not found")
        }

        if (urlEntry.expiresAt && new Date(urlEntry.expiresAt) < new Date()) {
            await Url.updateOne({ _id: urlEntry._id }, { isActive: false });

            throw new ApiError(410, 'This ShortURL is expired');
        }

        urlEntry.clicks += 1;
        await urlEntry.save();

        return res.redirect(301, urlEntry.orgURL);

    } catch (error) {
        // If it's already an ApiError, rethrow to preserve status/message
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, 'Redirection failed', error);
    }
}
export { urlShorter, redirectToOriginalUrl }