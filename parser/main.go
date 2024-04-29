package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func SquareSum(numbers []int) int {
	var suma = 0

	numbers.Each(func(i int, num int) {
		suma += num * num
	})
	return suma
}

func ExampleScrape() {
	// Request the HTML page.
	res, err := http.Get("https://www.directfreight.com/home/boards/find/loads/all/California")
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()
	if res.StatusCode != 200 {
		log.Fatalf("status code error: %d %s", res.StatusCode, res.Status)
	}

	// Load the HTML document
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	doc.Find(".tr-main-result .result .row-bold").Each(func(i int, s *goquery.Selection) {
		fmt.Printf("connect")
		var load = Load{
			Age:          s.Find("age").Text(),
			Miles:        s.Find("dh-miles").Text(),
			TripMiles:    s.Find("tripmiles mileage-tab").Text(),
			CityOrigin:   s.Find("origin-city").Text(),
			OriginState:  s.Find("origin-state").Text(),
			CityDest:     s.Find("destination-city").Text(),
			DestState:    s.Find("destination-state").Text(),
			TrailerType:  s.Find("trailer-type").Text(),
			LoadSize:     s.Find("load-size").Text(),
			Length:       s.Find("length").Text(),
			Weight:       s.Find("weight").Text(),
			PayRate:      s.Find("payrate").Text(),
			PRM:          s.Find("rate_per_mile_est").Text(),
			ShipDate:     s.Find("ship-date").Text(),
			CreditReport: s.Find("credit credit-report-tab").Text(),
			TIA:          s.Find("tia").Text(),
			CompanyInfo:  s.Find("contactInfo").Text(),
		}

		fmt.Printf("Load %d: %+v\n", i, load)
	})
}

func main() {
	ExampleScrape()
}

type Load struct {
	Age          string
	Miles        string
	TripMiles    string
	CityOrigin   string
	OriginState  string
	CityDest     string
	DestState    string
	TrailerType  string
	LoadSize     string
	Length       string
	Weight       string
	PayRate      string
	PRM          string
	ShipDate     string
	CreditReport string
	TIA          string
	CompanyInfo  string
}
