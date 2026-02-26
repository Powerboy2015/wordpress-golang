namespace Api.Dtos;

public class MangaOverviewDTO
{
    public string Name { get; }
    public string Img { get; }
    public MangaOverviewDTO(string _name, string _img)
    {
        this.Name = _name;
        this.Img = _img;
    }
}