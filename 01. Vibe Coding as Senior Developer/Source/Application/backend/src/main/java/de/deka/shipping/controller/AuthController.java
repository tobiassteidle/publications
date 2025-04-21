package de.deka.shipping.controller;

import de.deka.shipping.config.AuthConfigProperties;
import de.deka.shipping.service.SessionService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final SessionService sessionService;
    private final AuthConfigProperties authConfigProperties;

    @Autowired
    public AuthController(
            ClientRegistrationRepository clientRegistrationRepository,
            SessionService sessionService,
            AuthConfigProperties authConfigProperties) {
        this.clientRegistrationRepository = clientRegistrationRepository;
        this.sessionService = sessionService;
        this.authConfigProperties = authConfigProperties;
    }

    @GetMapping("/login")
    public RedirectView login() {
        logger.info("Login endpoint called, redirecting to OAuth2 endpoint");

        // Debugging
        if (clientRegistrationRepository instanceof InMemoryClientRegistrationRepository) {
            InMemoryClientRegistrationRepository repo = (InMemoryClientRegistrationRepository) clientRegistrationRepository;
            ClientRegistration registration = repo.findByRegistrationId("keycloak");
            if (registration != null) {
                logger.info("Found Keycloak client registration");
            } else {
                logger.error("Keycloak client registration not found");
            }
        }

        // Redirect to OAuth2 authorization
        return new RedirectView("/oauth2/authorization/keycloak", true);
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, Object>> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();

        // Sammeln der Benutzerinformationen aus den OAuth2 Attributen
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", oauthUser.getAttribute("name"));
        userInfo.put("email", oauthUser.getAttribute("email"));
        userInfo.put("preferred_username", oauthUser.getAttribute("preferred_username"));
        userInfo.put("sub", oauthUser.getAttribute("sub"));

        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        // Extract the session ID from the cookie
        Cookie[] cookies = request.getCookies();
        String sessionId = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (authConfigProperties.getCookie().getName().equals(cookie.getName())) {
                    sessionId = cookie.getValue();

                    // Clear the session cookie
                    Cookie clearCookie = new Cookie(cookie.getName(), "");
                    clearCookie.setPath("/");
                    clearCookie.setMaxAge(0);

                    if (authConfigProperties.getCookie().getDomain() != null) {
                        clearCookie.setDomain(authConfigProperties.getCookie().getDomain());
                    }

                    clearCookie.setHttpOnly(true);
                    clearCookie.setSecure(authConfigProperties.getCookie().isSecure());
                    response.addCookie(clearCookie);

                    break;
                }
            }
        }

        // Invalidate the session in the backend
        if (sessionId != null) {
            sessionService.invalidateSession(sessionId);
        }

        // Clear the security context
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok().build();
    }
}
