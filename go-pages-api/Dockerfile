# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY src/go.mod ./
COPY src/go.sum ./
RUN go mod download
COPY ./src ./src
WORKDIR /app/src
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app/server

# Final stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates chromium
WORKDIR /root/
COPY --from=builder /app/server .
EXPOSE 8080
# Set Chromium path for Rod
ENV ROD_LAUNCHER_BIN=/usr/bin/chromium-browser
CMD ["./server"]
