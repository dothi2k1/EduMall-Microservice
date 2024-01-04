#!/bin/bash

# Danh sách các dự án Spring Boot
projects=("common" "course" "gateway"  "order-service" "registry")

# Lặp qua từng dự án và chạy ./gradlew bootRun
for project in "${projects[@]}"
do
  cd "$project"
  ./gradlew bootRun &
  cd ..
done

# Chờ tất cả các dự án hoàn thành
wait
