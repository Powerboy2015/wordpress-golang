import type {MangaData, MangaOverview} from "../types/index";


export class MangaAPI {
    public baseUrl: URL;

    constructor(_baseUrl:string) {
        const _url: URL = new URL(_baseUrl);
        _url.port = "8080";
        this.baseUrl = _url;

    }

    // Requests latest overview of manga's.
    async fetchOverview(): Promise<Record<string,MangaOverview> |false > {

        // sets up url to fets overview.
        const url: URL = this.baseUrl;
        url.pathname = "/getRecents";

        const resp = await fetch(url);

        // escapes if bad response.
        if(!resp.ok) {
            return false;
        }

        // cast into a record and MangaOverview interface.
        const data: Record<string,MangaOverview> = await resp.json();
        return data;
    }

    // gets the info of a manga.
    async fetchMangaData(manga: string): Promise<MangaData | false> {
        const url: URL = this.baseUrl;
        url.pathname = "/getManwhaData";
        url.searchParams.set("url",manga);

        const resp = await fetch(url);

        if(!resp.ok) {
            return false;
        }

        const data: MangaData = await resp.json();
        return data;
    }

    // gets the list of image links.
    async fetchChapter(_manga: string, _chapter:number): Promise<string[] | false> {
        const url: URL = this.baseUrl;
        url.pathname = "/getChapter";
        url.searchParams.set("manga",_manga);
        url.searchParams.set("chapter",_chapter.toString());

        const resp = await fetch(url);

        if(!resp.ok) {
            return false;
        }

        const _data: string[] = await resp.json();
        return _data;
    }
}
