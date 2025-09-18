
// type used for Manga's on the overview
export interface MangaOverview {
    Name:       string;
    Img:        string;
}

export interface MangaData {
    Name:       string;
    Img :       string;
    Chapters:   Chapter[];
    LastUpdate: string;
    Summary:    string;
}

interface Chapter{
    number: number;
    link:   string;
    // images: string[] | null;
}