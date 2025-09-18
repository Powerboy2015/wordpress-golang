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
	"time"

	"example.com/m/v2/redis"
	"github.com/PuerkitoBio/goquery"
)

// Create sorted slice of chapters
type Chapter struct {
	Number float64 `json:"number"`
	Link   string  `json:"link"`
}

type manwha struct {
	Name       string
	Img        string
	Chapters   []Chapter
	LastUpdate string
	Summary    string
}

type RecentUpdate struct {
	Name string
	Img  string
}

type Pair struct {
	Key   int    `json:"key"`
	Value string `json:"value"`
}

var PAGE_URL string = os.Getenv("pageURL")

func getRecentlyUpdated(w http.ResponseWriter, r *http.Request) {
	redisKey := "Recents"
	cache, found, err := redis.Get[map[string]RecentUpdate](redisKey)
	if found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cache)
		return
	}

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

	links := make(map[string]RecentUpdate)
	doc.Find(".doreamon > .itemupdate").Each(func(i int, s *goquery.Selection) {
		data := make(map[string]string)

		title := s.Find("h3 > a")
		href := title.AttrOr("href", "not-found")
		if href != "" {
			short := title.Text()
			data["name"] = short
		}

		img := s.Find("img")
		imgHref := img.AttrOr("src", "not-found")

		if imgHref != "" {
			data["image"] = imgHref
		}

		mangaLink := strings.ReplaceAll(href, PAGE_URL+"/manga/", "")

		links[mangaLink] = RecentUpdate{
			Name: data["name"],
			Img:  data["image"],
		}

	})

	redis.Set(redisKey, links, 5*time.Minute)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(links)
}

func getManwhaData(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	manwhaName := query.Get("url")
	redisKey := redis.HashKey(manwhaName)

	cache, found, err := redis.Get[manwha](redisKey)
	if found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cache)
		return
	}

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

	img := doc.Find(".manga-info-pic >img").AttrOr("src", "not-found")

	chapters := make(map[float64]string)
	doc.Find(".chapter-list > * a").Each(func(i int, s *goquery.Selection) {
		href := s.AttrOr("href", "")
		if href != "" {
			short := s.Text()
			chapterNum := strings.Replace(short, "Chapter ", "", 1)

			chapterInt, err := strconv.ParseFloat(chapterNum, 64)
			if err != nil {
				fmt.Println("Error converting string to int:", err)
				return
			}

			chapters[chapterInt] = strings.ReplaceAll(href, PAGE_URL+"/manwha/", "")
		}
	})

	keys := make([]float64, 0, len(chapters))
	for k := range chapters {
		keys = append(keys, k)
	}
	sort.Float64s(keys)

	var sorted []Chapter
	for _, k := range keys {
		sorted = append(sorted, Chapter{
			Number: k,
			Link:   chapters[k],
		})
	}

	response := manwha{
		Name:       title,
		Img:        img,
		Chapters:   sorted,
		LastUpdate: lastUpdate,
		Summary:    summary,
	}

	redis.Set(redisKey, response, 30*time.Minute)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func getChapter(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	mangaName := query.Get("manga")
	chapterStr := query.Get("chapter")

	redisKey := redis.HashKey(fmt.Sprintf("%s:%s", mangaName, chapterStr))

	cache, found, err := redis.Get[[]string](redisKey)
	if found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cache)
		return
	}

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

	redis.Set(redisKey, images, 72*time.Hour)
	w.Header().Set("Content-Type", "application/json")
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
	redis.InitRedis()
	http.Handle("/api/getRecents", enableCORS(http.HandlerFunc(getRecentlyUpdated)))

	http.Handle("/api/getManwhaData", enableCORS(http.HandlerFunc(getManwhaData)))

	http.Handle("/api/getChapter", enableCORS(http.HandlerFunc(getChapter)))

	http.Handle("/api/getImage", enableCORS(http.HandlerFunc(getImage)))
	http.ListenAndServe(":8080", nil)
}
