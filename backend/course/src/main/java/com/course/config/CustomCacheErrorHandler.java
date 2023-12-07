package com.course.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;

@Slf4j
public class CustomCacheErrorHandler implements CacheErrorHandler {

    @Override
    public void handleCacheGetError(RuntimeException exception, Cache cache, Object key) {
        log.error(String.format("Unable to get data from cache : %s", exception.getMessage()));
    }
    @Override
    public void handleCachePutError(RuntimeException exception, Cache cache, Object key, Object value) {
        log.error(String.format("Unable to put data into the cache : %s", exception.getMessage()));
    }
    @Override
    public void handleCacheEvictError(RuntimeException exception, Cache cache, Object key) {
        log.error(String.format("Unable to evict data from cache : %s", exception.getMessage()));
    }
    @Override
    public void handleCacheClearError(RuntimeException exception, Cache cache) {
        log.error(String.format("Unable to clear data from cache : %s", exception.getMessage()));
    }

}