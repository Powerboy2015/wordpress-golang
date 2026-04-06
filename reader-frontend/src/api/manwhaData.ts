import type { DetailedManwhaInfo, ManwhaChapter, manwhaData } from "../types/types";
abstract class MangaApi {
    abstract getManwhas(): Promise<manwhaData[]>
    abstract getDetailedManwha(_manwhaSlug:string): Promise<DetailedManwhaInfo>
    abstract getManwhaChapter(_manwhaSlug:string,_chapterNumber:string): Promise<ManwhaChapter>
}



class mockManwha implements MangaApi {
    getManwhas(): Promise<manwhaData[]> {
        return new Promise((resolve) =>{
            const template = {name:"Mangatitle 1235 in another worl..",
                    author:"Artsist drawer",
                    chapters:112,
                    coverURL:"https://placehold.co/96x137",
                    slugName:"mangatitle-1235-in-another-world"
                    };
                resolve([
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                    template,
                ]);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDetailedManwha(_manwhaSlug: string): Promise<DetailedManwhaInfo> {
        return new Promise((resolve) => {
            resolve({
                    name:"Mangatitle 1235 in another worl..",
                    author:"Artsist drawer",
                    chapters:[{
                        number: 1,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 2,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 3,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 4,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 5,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 6,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 7,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    },
                    {
                        number: 8,
                        uploadDate: "2025-01-01",
                        link: "Testlink"
                    }
                ],
                    coverURL:"https://placehold.co/600x853",
                    slugName:"mangatitle-1235-in-another-world",
                    desc: "You are reading Super God of War manga, one of the most popular manga covering in Action, Fantasy, Long strip, Manhua genres, written by at MangaBuddy, a top manga site to offering for free. Super God of War has 16 translated chapters and translations of other chapters are in progress. Lets enjoy. If you want to get the updates about latest chapters, lets create an account and add Super God of War to your bookmark. Battle Emperor Fu Sheng is the most popular player in the game, The New Age. Everyone believes that only he will become the champion in the final battle! His real nameLin Jie. The reason for his participation in the battle is to win the Capsule of Revitalization for his injured mother and sister. With the Broken Blade, a Heritage weapon, in hand, he finally makes it to the final battle! Only then does he realize that his best friend had betrayed him! After his devastating defeat, Lin Jie is shocked to realize that he had time-travelled all the way back to a few years ago when the beta version of The New Age was just about to launch!With all my knowledge of the gamePros on the leaderboard? All of them my underlings!First kill of a BOSS? Mine!First clear of the exclusive dungeon? Still mine!Whatever I lost in the past, I'll get them all back!Whoever brought me trouble, you're as good as dead!When I have the chance to do it all over again, I WILL BE EMPEROR!I am Fu Sheng, the STRONGEST warrior in The New Age. No one, absolutely no one, can stand before me!"
            })
        })

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getManwhaChapter(_manwhaSlug:string,_chapterNumber:string): Promise<ManwhaChapter> {
        return new Promise((resolve) => {
            const resp = ["https://placehold.co/1123x1500","https://placehold.co/1123x1500","https://placehold.co/1123x1500","https://placehold.co/1123x1500","https://placehold.co/1123x1500"];
            console.log("returns: ", resp)
            resolve({
                images: resp 
            });
        });
    }
}

// NOTE this can be swapped out with the real one later on.
export const manwhaAPI: MangaApi = new mockManwha();