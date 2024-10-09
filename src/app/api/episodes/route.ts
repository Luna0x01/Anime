import getHtml from "@/app/lib/getHtml";
import { load } from "cheerio";

export async function POST(request: Request) {
    const { anime, cookie } = await request.json();

    if (!anime || !cookie) {
        return Response.json({ message: "Bad request", ok: false }, { status: 401 })
    }

    const url = `https://anitaku.pe${anime}`;
    const html = await getHtml(cookie, url);

    if (html) {
        const $ = load(html);
        const episodes = $('#episode_page li .active').text().split('-');
        const min = episodes[0];
        const max = episodes[1];
        return Response.json({ min, max })
    } else {
        return Response.json({ message: 'Error loading the page', ok: false }, { status: 500 });
    }
}
