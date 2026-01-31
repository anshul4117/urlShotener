
import shortid from "shortid";

const getShortCode = () => {
    return shortid.generate();
}

const verifyProtocal = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `http://${url}`;
    }
    return url;
}

const getBaseUrl = (req) => {
    return `${req.protocol}://${req.get('host')}`;
}

export { getShortCode, verifyProtocal, getBaseUrl };