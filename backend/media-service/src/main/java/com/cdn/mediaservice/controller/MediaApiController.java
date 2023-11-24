package com.cdn.mediaservice.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/media")
public class MediaApiController {

    private static final String UPLOAD_DIR = "./media/";

    @GetMapping("/{mediaType}/{date}/{fileName:.+}")
    public ResponseEntity<Resource> getMedia(@PathVariable String mediaType, @PathVariable String date, @PathVariable String fileName) {
        Path mediaPath = Paths.get(UPLOAD_DIR + mediaType + "/" + date + "/" + fileName);

        if (!Files.exists(mediaPath)) {
            return ResponseEntity.notFound().build();
        }

        Resource mediaResource = new FileSystemResource(mediaPath);

        return ResponseEntity.ok()
                .body(mediaResource);
    }

    @PostMapping("/upload/{mediaType}")
    public ResponseEntity<List<String>> handleMediaUpload(
            @RequestParam("files") MultipartFile[] files,
            @PathVariable String mediaType) {

        try {
            LocalDate currentDate = LocalDate.now();
            Path mediaDirectory = Paths.get(UPLOAD_DIR + mediaType + "/" + currentDate);
            Files.createDirectories(mediaDirectory);

            List<String> cdnLinks = new ArrayList<>();

            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path filePath = mediaDirectory.resolve(fileName);
                Files.write(filePath, file.getBytes());

                String cdnLink = "http://localhost:9000/api/media/" + mediaType + "/" + currentDate + "/" + fileName;
                cdnLinks.add(cdnLink);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(cdnLinks);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error uploading files: " + e.getMessage()));
        }
    }
}