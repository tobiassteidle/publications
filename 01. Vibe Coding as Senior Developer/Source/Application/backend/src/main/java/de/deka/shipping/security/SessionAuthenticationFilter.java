package de.deka.shipping.security;

import de.deka.shipping.config.AuthConfigProperties;
import de.deka.shipping.service.SessionService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SessionAuthenticationFilter extends OncePerRequestFilter {

    private final SessionService sessionService;
    private final AuthConfigProperties authConfigProperties;

    @Autowired
    public SessionAuthenticationFilter(
            SessionService sessionService,
            AuthConfigProperties authConfigProperties) {
        this.sessionService = sessionService;
        this.authConfigProperties = authConfigProperties;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String sessionId = extractSessionId(request);

        if (sessionId != null && sessionService.isValidSession(sessionId)) {
            Optional<OAuth2User> userOpt = sessionService.getUser(sessionId);
            Optional<OAuth2AuthorizedClient> clientOpt = sessionService.getAuthorizedClient(sessionId);

            if (userOpt.isPresent() && clientOpt.isPresent()) {
                OAuth2User user = userOpt.get();
                OAuth2AuthorizedClient client = clientOpt.get();

                OAuth2AuthenticationToken authentication = new OAuth2AuthenticationToken(
                        user,
                        user.getAuthorities(),
                        client.getClientRegistration().getRegistrationId());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String extractSessionId(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (authConfigProperties.getCookie().getName().equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}