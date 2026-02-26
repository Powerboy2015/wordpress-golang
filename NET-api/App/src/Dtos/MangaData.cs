namespace Api.Dtos;

public class MangaDataDTO
{
    public string Name { get; set; }
    public string Img { get; set; }
    public List<ChapterDTO> Chapters { get; set; }
    public string LastUpdate { get; set; }
    public string Summary { get; set; }
    public MangaDataDTO(string _name, string _img, List<ChapterDTO> _chapters, string _lastUpdate, string _summary)
    {
        this.Name = _name;
        this.Img = _img;
        this.Chapters = _chapters;
        this.LastUpdate = _lastUpdate;
        this.Summary = _summary;
    }

}