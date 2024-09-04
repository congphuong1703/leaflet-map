Sử dụng GIS để tạo ảnh với định dạng .tiff gồm tạo độ và điểm tương ứng với Map [Tạo ảnh Overlay](https://www.youtube.com/watch?v=JaZ2bt2AxUg&ab_channel=RITLibraries) 

Note: Sử dụng Google Map or OpenStreetMap thì tọa độ định dang ESPG:3587

Sử dung GDAL để tách ảnh thành nhiều tile nhỏ: gdal2tiles.py -z 1-18 -x source target 

Note: Càng nhiều độ zoom thì càng lâu do phải tách ảnh thành nhiều tile

Ví dụ: [Disney Land](https://disneyland.disney.go.com/destinations/)