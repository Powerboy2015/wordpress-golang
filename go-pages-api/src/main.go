package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

// Create sorted slice of chapters
type Chapter struct {
	Number int    `json:"number"`
	Link   string `json:"link"`
}

type manwha struct {
	Name       string
	Chapters   []Chapter
	LastUpdate string
	Summary    string
}

type Pair struct {
	Key   int    `json:"key"`
	Value string `json:"value"`
}

var PAGE_URL string = os.Getenv("pageURL")

func getRecentlyUpdated(w http.ResponseWriter, r *http.Request) {
	res, err := http.Get(PAGE_URL)
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

	res, err := http.Get(PAGE_URL + "/manga/" + manwhaName)
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

			chapters[chapterInt] = strings.Replace(href, PAGE_URL+"/manwha/", "", -1)
		}
	})

	keys := make([]int, 0, len(chapters))
	for k := range chapters {
		keys = append(keys, k)
	}
	sort.Ints(keys)

	var sorted []Chapter
	for _, k := range keys {
		sorted = append(sorted, Chapter{
			Number: k,
			Link:   chapters[k],
		})
	}

	response := manwha{
		Name:       title,
		Chapters:   sorted,
		LastUpdate: lastUpdate,
		Summary:    summary,
	}

	json.NewEncoder(w).Encode(response)
}

func getChapter(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	mangaName := query.Get("manga")
	chapterStr := query.Get("chapter")

	res, err := http.Get(PAGE_URL + "/manga/" + mangaName + "/chapter-" + chapterStr)
	if err != nil {
		log.Fatal(err)
	}

	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	images := []string{}
	doc.Find(".container-chapter-reader > img").Each(func(i int, s *goquery.Selection) {
		imgLink := s.AttrOr("src", "")
		images = append(images, imgLink)
	})

	json.NewEncoder(w).Encode(images)
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func getImage(w http.ResponseWriter, r *http.Request) {
	imageUrl := r.URL.Query().Get("url")
	if imageUrl == "" {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	req, err := http.NewRequest("GET", imageUrl, nil)
	if err != nil {
		http.Error(w, "bad Request", http.StatusBadRequest)
		return
	}

	req.Header.Set("Cookie", "")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0 Safari/537.36")
	req.Header.Set("Referer", PAGE_URL+"/")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to fetch image", http.StatusBadGateway)
		return
	}

	defer resp.Body.Close()

	// Forward the content type
	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	io.Copy(w, resp.Body)
}

func main() {
	http.Handle("/getRecents", enableCORS(http.HandlerFunc(getRecentlyUpdated)))
	http.Handle("/getManwhaData", enableCORS(http.HandlerFunc(getManwhaData)))
	http.Handle("/getChapter", enableCORS(http.HandlerFunc(getChapter)))
	http.Handle("/getImage", enableCORS(http.HandlerFunc(getImage)))
	http.ListenAndServe(":8080", nil)
}
