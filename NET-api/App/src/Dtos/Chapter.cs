namespace Api.Dtos;

public class ChapterDTO
{
    public int Id { get; set; }
    public string link { get; set; }
    public ChapterDTO(int _id, string _link)
    {
        this.Id = _id;
        this.link = _link;
    }
}