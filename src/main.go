package main

import (
	"encoding/json"
	"net/http"
)

func defaultResponse(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
        http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
        return
    }

	w.Header().Set("Content-Type", "application/json")
	var response string = "Response"
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/test",defaultResponse)
	http.ListenAndServe(":8080", nil)
}