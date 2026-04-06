export interface manwhaData {
    name: string;
    author: string;
    chapters:number;
    coverURL: string;
    slugName: string;
}

export interface DetailedManwhaInfo {
    name: string;
    author: string;
    chapters: ChapterInfo[];
    coverURL: string;
    slugName: string;
    desc: string;
}

export interface ChapterInfo {
    number: number;
    uploadDate: string;
    link: string;
}

export interface ManwhaChapter {
    images: string[];
}