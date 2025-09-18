import type {MangaData, MangaOverview} from "../types/index";

/**
 * Simple api we can use to get data from our golang API.
 */
export class MangaAPI {
    public baseUrl: URL;

    // XXX Needs an rework for prod.
    constructor(_baseUrl?:string) {
        const _url: URL = new URL(_baseUrl ?? window.location.href);
        _url.pathname = "";
        this.baseUrl = _url;

    }

    // Requests latest overview of manga's.
    async fetchOverview(): Promise<Record<string,MangaOverview> |false > {

        // sets up url to fets overview.
        const url: URL = this.baseUrl;
        url.pathname = "/api/getRecents";

        const resp = await fetch(url);

        if(!resp.ok) {
            return false;
        }

        // cast into a record and MangaOverview interface.
        const data: Record<string,MangaOverview> = await resp.json();
        return data;
    }

    /**
     * Fetches the data for a specific manga.
     * @param manga the name of the manga
     * @returns the manga data or false if not found
     */
    async fetchMangaData(manga: string): Promise<MangaData | false> {
        const url: URL = this.baseUrl;
        url.pathname = "/api/getManwhaData";
        url.searchParams.set("url",manga);

        const resp = await fetch(url);

        if(!resp.ok) {
            return false;
        }

        const data: MangaData = await resp.json();
        return data;
    }

    // gets the list of image links.
    async fetchChapter(_manga: string, _chapter:string): Promise<string[] | false> {
        const url: URL = this.baseUrl;
        url.pathname = "/api/getChapter";
        url.searchParams.set("manga",_manga);
        url.searchParams.set("chapter",_chapter.replaceAll(".","-"));

        const resp = await fetch(url);

        if(!resp.ok) {
            return false;
        }

        const _data: string[] = await resp.json();
        return _data;
    }
}
