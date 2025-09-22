package search

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"example.com/m/v2/redis"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
)

var PAGE_URL string = os.Getenv("pageURL")

type SearchResult struct {
	Name string `json:"name"`
	Img  string `json:"img"`
	Link string `json:"link"`
}

func FindManga(w http.ResponseWriter, r *http.Request) {
	// Debug the incoming request
	log.Printf("Request URL: %s", r.URL.String())
	log.Printf("Query string: %s", r.URL.RawQuery)

	query := r.URL.Query()
	log.Printf("Parsed query params: %v", query)

	searchToken := query.Get("search")

	// Debug the search token
	log.Printf("Raw search token: %q", searchToken)
	log.Printf("Search token length: %d", len(searchToken))
	log.Printf("Search token bytes: %v", []byte(searchToken))

	// Check if search token is empty
	if searchToken == "" {
		log.Printf("Error: No search token provided")
		http.Error(w, "Search token is required", http.StatusBadRequest)
		return
	}

	// Clean the search token of any null characters or unwanted content
	searchToken = strings.TrimSpace(searchToken)
	searchToken = strings.ReplaceAll(searchToken, "\x00", "")  // Remove null characters
	searchToken = strings.ReplaceAll(searchToken, "<nil>", "") // Remove <nil> if it somehow got in there

	log.Printf("Cleaned search token: %q", searchToken)

	redisKey := redis.HashKey(("Search:" + searchToken))

	cache, found, err := redis.Get[[]SearchResult](redisKey)
	if err != nil {
		log.Fatal(err)
	}

	if found {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(cache)
		return
	}

	log.Printf("setting up launcher")
	// Configure browser for Docker environment
	l := launcher.New().
		Headless(true).
		NoSandbox(true).
		Devtools(false)

	log.Printf("setting up OS path")
	// Check if system browser is available
	if browserPath := os.Getenv("ROD_LAUNCHER_BIN"); browserPath != "" {
		l = l.Bin(browserPath)
	}

	log.Printf("setting up new browser")
	browser := rod.New().ControlURL(l.MustLaunch()).MustConnect()

	defer browser.MustClose()

	log.Printf("opening page")
	page := browser.MustPage(PAGE_URL)
	page.WaitLoad()

	log.Printf("finding search bar : " + searchToken)
	inputEl := page.MustElement("#search_story")
	inputEl.MustInput(searchToken)

	page.MustEval(`el => {
	el.dispatchEvent(new KeyboardEvent("keydown",  { key: "a", code: "KeyA", keyCode: 65, bubbles: true }));
	el.dispatchEvent(new KeyboardEvent("keypress", { key: "a", code: "KeyA", keyCode: 65, bubbles: true }));
	el.dispatchEvent(new KeyboardEvent("keyup",    { key: "a", code: "KeyA", keyCode: 65, bubbles: true }));
	}`, inputEl)

	log.Printf("finding elements")
	page.WaitElementsMoreThan("#search_result > ul > * > *", 0)
	mainEl, err := page.Elements("#search_result > ul > * > *")
	if err != nil {
		log.Fatal(err)
	}

	mangaList := []SearchResult{}

	// Loop through each element
	for _, element := range mainEl {
		manga := SearchResult{}

		// Extract data from each element
		// Get image source
		imgEl := element.MustElement("img")
		if imgSrc := imgEl.MustAttribute("src"); imgSrc != nil {
			manga.Img = *imgSrc
		}

		// Get title and link
		titleEl := element.MustElement("search_result_row1")
		manga.Name = titleEl.MustText()
		if linkHref := titleEl.MustAttribute("id"); linkHref != nil {
			manga.Link = *linkHref
		}

		mangaList = append(mangaList, manga)
		log.Printf("Found manga: %s", manga.Name)
	}

	// Store result in cache
	redis.Set(redisKey, mangaList, 30*time.Minute)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(mangaList)
}
