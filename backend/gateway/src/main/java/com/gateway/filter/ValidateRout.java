//package com.gateway.filter;
//
//import org.springframework.http.server.reactive.ServerHttpRequest;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//import java.util.function.Predicate;
//
//@Component
//public class ValidateRout {
//    public static List<String> publicRoutes=List.of(
//            "/api/sv1/auth/login",
//            "/api/sv1/auth/save",
//            "/api/sv2/private/"
//    );
//
//    public Predicate<ServerHttpRequest> isPrivate=
//            request->request.getURI().getPath().contains("private");
//}
