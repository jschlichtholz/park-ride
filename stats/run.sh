#!/bin/sh

echo "Regenerating graphs from JSON..."

# Clear data.csv and print header.
echo "id,timestamp,category" > data.csv

# Find all JSON files in the data folder and convert them to a single data.csv.
find data -type f -iname "*.json" -exec awk -f json2csv.awk {} \; >> data.csv

# Generate plots from data.csv.
Rscript generate.R

echo "Done."
