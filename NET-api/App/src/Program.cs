using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Api.Dtos;
using Api.Responses;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () =>
{
    MangaOverviewDTO data = new("test", "link");
    ApiReponse resp = new(ApiStatus.Success, data);
    return resp;
});

app.Run();