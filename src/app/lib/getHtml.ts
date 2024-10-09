import axios from "axios";

export default async function (cookie: string, url: string) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.8,sk;q=0.5,cs;q=0.3',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Referer': 'https://anitaku.pe/',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Cookie': cookie,
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Priority': 'u=0, i'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}