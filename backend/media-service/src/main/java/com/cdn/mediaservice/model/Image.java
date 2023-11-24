package com.cdn.mediaservice.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "public_id")
    private String publicId;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "date_folder")
    private String dateFolder;

    public Image(Long imageId, String publicId, String url, User user, Date createdAt) {
        this.imageId = imageId;
        this.publicId = publicId;
        this.url = url;
        this.user = user;
        this.createdAt = createdAt;
    }

    public Image() {

    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getDateFolder() {
        return dateFolder;
    }

    public void setDateFolder(String dateFolder) {
        this.dateFolder = dateFolder;
    }
}