import getHtml from "@/app/lib/getHtml";
import { load } from "cheerio";

export async function POST(request: Request) {
    const { anime, episode, cookie } = await request.json();

    if (!anime || !episode || !cookie) {
        return Response.json({ message: "Bad request", ok: false }, { status: 401 })
    }

    const animeName = anime.split('/')[2];
    const url = `https://anitaku.pe/${animeName}-episode-${episode}`;
    const html = await getHtml(cookie, url);

    if (html) {
        const $ = load(html);
        const downloadLink = $('.list_dowload').find('a').last().attr('href');

        return Response.json({ url: downloadLink })
    } else {
        return Response.json({ message: 'Error loading the page', ok: false }, { status: 500 });
    }
}
