package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func getTitle(w http.ResponseWriter, r *http.Request) {
    res, err := http.Get("https://www.natomanga.com/")
    if err != nil {
        log.Fatal(err)
    }
    defer res.Body.Close()

    if res.StatusCode != 200 {
        log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
    }

    doc, err := goquery.NewDocumentFromReader(res.Body)
    if err != nil {
        log.Fatal(err)
    }

    links := make(map[string]string)
    doc.Find(".doreamon h3 > .tooltip").Each(func(i int, s *goquery.Selection) {
        href := s.AttrOr("href","")
        if href != "" {
            short := s.Text()
            links[short] = href
        }
    })

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(links)
}

func main() {
	http.HandleFunc("/getRecents",getTitle)
	http.ListenAndServe(":8080", nil)
}