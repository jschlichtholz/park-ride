data <- read.csv('data.csv')

# Convert string to timestamp
data$timestamp <- strptime(data$timestamp, '%Y-%m-%dT%H:%M:%S')

# Get day of week
data$wday <- data$timestamp$wday
data$wday <- as.factor(data$wday)

# Get hour of day
data$hour <- data$timestamp$hour
data$hour <- as.factor(data$hour)

getCategories <- function(sid) {
  sub <- as.data.frame(ftable(1 ~ wday + hour + category, data = subset(data, data$id == sid)))

  matrix <- sapply(0:6, function(d) {
    subday <- subset(sub, sub$wday == d)
    sapply(0:23, function(h) {
      subhour <- subset(subday, subday$hour == h)
      if(max(subhour$Freq) == -Inf) {
        NA
      } else {
        subcategory <- subset(subhour, subhour$Freq == max(subhour$Freq))
        as.numeric(levels(subcategory$category))[subcategory$category[[1]]]
      }
    })
  })

  colnames(matrix) <- c('Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag')
  rownames(matrix) <- paste(0:23, 'Uhr')
  t(matrix)
}

plotSite <- function(id) {
  par(mfrow=c(2,2))
  heatmap(
  getCategories(id),
  Rowv = NA,
  Colv = NA,
  scale = 'none',
  col    = c('#c0392b', '#d35400', '#f1c40f', '#27ae60'),
  breaks = 1:5 - 0.5,
  cexCol = 1.5,
  cexRow = 1.5,
  margins = c(5,8)
  )
}

for (site in levels(factor(data$id))) {
  svg(
  filename = paste('../dist/assets/', site, '.svg', sep = ''),
  width = 10,
  height = 10,
  pointsize = 16
  )
  plotSite(site)
  dev.off()
}
