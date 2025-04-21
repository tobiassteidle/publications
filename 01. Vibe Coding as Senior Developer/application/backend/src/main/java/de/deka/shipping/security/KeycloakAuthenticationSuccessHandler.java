package de.deka.shipping.security;

import de.deka.shipping.config.AuthConfigProperties;
import de.deka.shipping.service.SessionService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class KeycloakAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(KeycloakAuthenticationSuccessHandler.class);

    private final SessionService sessionService;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final AuthConfigProperties authConfigProperties;

    @Autowired
    public KeycloakAuthenticationSuccessHandler(
            SessionService sessionService,
            OAuth2AuthorizedClientService authorizedClientService,
            AuthConfigProperties authConfigProperties) {
        this.sessionService = sessionService;
        this.authorizedClientService = authorizedClientService;
        this.authConfigProperties = authConfigProperties;
        setDefaultTargetUrl("http://localhost:4200/dashboard");
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        logger.info("Authentication success handler called");
        
        if (!(authentication instanceof OAuth2AuthenticationToken)) {
            logger.warn("Authentication is not OAuth2AuthenticationToken, using default handler");
            super.onAuthenticationSuccess(request, response, authentication);
            return;
        }

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        logger.info("Processing OAuth2 authentication for user: {}", oauthToken.getName());
        
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName());

        if (client == null) {
            logger.error("Could not load authorized client for user: {}", oauthToken.getName());
            super.onAuthenticationSuccess(request, response, authentication);
            return;
        }

        // Create a session with the token
        String sessionId = sessionService.createSession(client, oauthToken.getPrincipal());
        logger.info("Created session with ID: {}", sessionId);

        // Set the session cookie
        Cookie cookie = new Cookie(authConfigProperties.getCookie().getName(), sessionId);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(authConfigProperties.getCookie().isSecure());
        
        if (authConfigProperties.getCookie().getDomain() != null) {
            cookie.setDomain(authConfigProperties.getCookie().getDomain());
        }
        
        cookie.setMaxAge(authConfigProperties.getCookie().getMaxAge());
        
        response.addCookie(cookie);
        logger.info("Added auth cookie to response");
        
        // Redirect to the frontend dashboard
        String redirectUrl = getDefaultTargetUrl();
        logger.info("Redirecting to: {}", redirectUrl);
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}