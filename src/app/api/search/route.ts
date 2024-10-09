import getHtml from "@/app/lib/getHtml";
import { load } from "cheerio";

export async function POST(request: Request) {
    const { query, language, cookie } = await request.json();

    if(!query || !language || !cookie) {
        return Response.json({ message: "Bad request", ok: false }, { status: 401 })
    }

    const keyword = query.replaceAll(' ', '+');
    const url = `https://anitaku.pe/filter.html?keyword=${keyword}&language[]=${language}&sort=title_az`;
    const html = await getHtml(cookie, url);

    if (!html) {
        return Response.json({ message: 'Error loading the page', ok: false }, { status: 500 });
    }
    const $ = load(html);
    const items: AnimeSearchResult[] = [];
    $('.last_episodes .items li').each((index, element) => {
        const title = $(element).find('.name a').attr('title');
        const link = $(element).find('.name a').attr('href');
        const image = $(element).find('.img img').attr('src');
        const released = $(element).find('.released').text().trim();
        items.push({ title, link, image, released });
    });
    return Response.json({ query, items, message: "Successfully scraped.", ok: true });
}
  