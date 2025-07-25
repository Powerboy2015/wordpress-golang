package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type manwha struct {
	Name       string
	Chapters   map[int]string
	LastUpdate string
	Summary    string
}

func getRecentlyUpdated(w http.ResponseWriter, r *http.Request) {
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
		href := s.AttrOr("href", "")
		if href != "" {
			short := s.Text()
			links[short] = href
		}
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(links)
}

func getManwhaData(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	manwhaName := query.Get("url")

	res, err := http.Get("https://www.natomanga.com/manga/" + manwhaName)
	if err != nil {
		log.Fatal(err)
	}

	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	title := doc.Find("h1").Text()
	lastUpdate := doc.Find(".manga-info-text > li").Eq(3).Text()
	summary := doc.Find("#contentBox").Text()

	chapters := make(map[int]string)
	doc.Find(".chapter-list > * a").Each(func(i int, s *goquery.Selection) {
		href := s.AttrOr("href", "")
		if href != "" {
			short := s.Text()
			chapterNum := strings.Replace(short, "Chapter ", "", 1)

			chapterInt, err := strconv.Atoi(chapterNum)
			if err != nil {
				fmt.Println("Error converting string to int:", err)
				return
			}

			chapters[chapterInt] = href
		}
	})

	response := manwha{
		Name:       title,
		Chapters:   chapters,
		LastUpdate: lastUpdate,
		Summary:    summary,
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/getRecents", getRecentlyUpdated)
	http.HandleFunc("/getManwhaData", getManwhaData)
	http.ListenAndServe(":8080", nil)
}
