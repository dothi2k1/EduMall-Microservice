package com.cdn.mediaservice.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ImageInfo {
    private LocalDate date;
    private String fileName;

    public ImageInfo(LocalDate date, String fileName) {
        this.date = date;
        this.fileName = fileName;
    }
}