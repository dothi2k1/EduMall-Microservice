package com.cdn.mediaservice.controller;

import com.cdn.mediaservice.model.User;
import com.cdn.mediaservice.repository.UserRepository;
import com.cdn.mediaservice.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<List<String>> handleFileUpload(@RequestParam("files") MultipartFile[] files,
                                                         @RequestParam("apiKey") String apiKey) {
        User user = userRepository.findByApiKey(apiKey);

        if (user != null) {
            List<String> cdnLinks = imageService.uploadImage(Arrays.asList(files), apiKey);
            return ResponseEntity.ok(cdnLinks);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/{date}/{imageName}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable String date, @PathVariable String imageName) {
        try {
            InputStream imageStream = imageService.getImage(date, imageName);

            // Return the image as ResponseEntity
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(new InputStreamResource(imageStream));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}