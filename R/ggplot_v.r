library(ggplot2)
data1 <- read.csv('penglings.csv')

ggplot(data1, aes(
  x= flipper_length_mm,
  y= body_mass_g,
  color = species,
  size = bill_length_mm
)) + geom_point(alpha = 0.8) + scale_color_manual(values = c(
  "Adelie" = "#FFA500",
  "Chinstrap" = "#8F3DD1",
  "Gentoo" = "#008000"
  
))
