namespace Api.Responses;

public enum ApiStatus
{
    Success,
    Error,
    DataEmpty
}

public class ApiReponse
{
    public ApiStatus ResponseType;


    public bool Ok =>
    ResponseType switch
    {
        ApiStatus.Success => true,
        _ => false
    };
    public string Message =>
    ResponseType switch
    {
        ApiStatus.Success => "success",
        ApiStatus.DataEmpty => "No response",
        ApiStatus.Error => "uncaught Error",
        _ => "unknown error"
    };
    public object? ReponseData { get; }
    public ApiReponse(ApiStatus _resp, object _data)
    {
        this.ResponseType = _resp;
        this.ReponseData = _data;
    }
}