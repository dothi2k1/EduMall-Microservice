package com.cdn.mediaservice.service;

import com.cdn.mediaservice.model.Image;
import com.cdn.mediaservice.model.User;
import com.cdn.mediaservice.repository.ImageRepository;
import com.cdn.mediaservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "./images/";

    public List<String> uploadImage(List<MultipartFile> files, String apiKey) {
        try {
            User user = userRepository.findByApiKey(apiKey);

//            if (user == null) {
//                return (List<String>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//            }

            LocalDate currentDate = LocalDate.now();
            Path dateDirectory = Paths.get(UPLOAD_DIR + currentDate);
            Files.createDirectories(dateDirectory);

            List<String> cdnLinks = new ArrayList<>();

            for (MultipartFile file : files) {
                String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path filePath = dateDirectory.resolve(fileName);
                Files.write(filePath, file.getBytes());

                String cdnLink = "http://localhost:9000/api/images/" + currentDate + "/" + fileName;
                cdnLinks.add(cdnLink);

                Image image = new Image();
                image.setPublicId(UUID.randomUUID().toString());
                image.setUrl(cdnLink);
                image.setUser(user);

                imageRepository.save(image);
            }

            return cdnLinks;
        } catch (IOException e) {
            e.printStackTrace();
            return (List<String>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    public InputStream getImage(String date, String imageName) throws IOException {
        Path imagePath = Paths.get(UPLOAD_DIR + date + "/" + imageName);
        return Files.newInputStream(imagePath);
    }

}
