package redis

import (
	"context"
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

var (
	Rdb *redis.Client
	ctx = context.Background()
)

func InitRedis() {
	host := os.Getenv("REDIS_HOST")
	port := os.Getenv("REDIS_PORT")
	if host == "" {
		host = "localhost"
	}

	if port == "" {
		port = "6379"
	}

	Rdb = redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%s", host, port),
	})

	/// Retry loop
	for range 10 {
		err := Rdb.Ping(ctx).Err()
		if err == nil {
			fmt.Println("Connected to Redis!")
			return
		}
		fmt.Println("Redis not ready, retrying in 1s...")
		time.Sleep(time.Second)
	}
}

func Get[T any](key string) (T, error) {
	var zero T
	// Gets redis key results
	val, err := Rdb.Get(ctx, key).Result()

	// redis nil check
	if err == redis.Nil {
		fmt.Printf("uncached request, chaching %s\n", key)
		return zero, nil
	}

	// error check
	if err != nil {
		fmt.Printf("redis GET error for %s: %v\n", key, err)
		return zero, nil
	}

	var result T
	// checks if json struct is valid.
	if err := json.Unmarshal([]byte(val), &result); err != nil {
		fmt.Printf("redis GET error for %s: %v\n", key, err)
		return zero, err
	}
	fmt.Printf("redis cache found for: %s \n", key)
	return result, nil
}

func Set[T any](key string, value T, ttl time.Duration) error {
	data, err := json.Marshal(value)
	if err != nil {
		return err
	}
	fmt.Printf("set redis cache for: %s\n", key)
	return Rdb.Set(ctx, key, data, ttl).Err()
}

// HashKey returns a hex string hash of any key
func HashKey(key string) string {
	h := sha1.New()
	h.Write([]byte(key))
	return fmt.Sprintf("%x", h.Sum(nil))
}
