package de.deka.shipping.service;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;

public interface SessionService {
    
    /**
     * Creates a new session and returns the session ID
     * 
     * @param client The authorized OAuth2 client
     * @param user The authenticated OAuth2 user
     * @return The session ID
     */
    String createSession(OAuth2AuthorizedClient client, OAuth2User user);
    
    /**
     * Gets the authorized client for the given session ID
     * 
     * @param sessionId The session ID
     * @return The authorized OAuth2 client, if found
     */
    Optional<OAuth2AuthorizedClient> getAuthorizedClient(String sessionId);
    
    /**
     * Gets the user for the given session ID
     * 
     * @param sessionId The session ID
     * @return The OAuth2 user, if found
     */
    Optional<OAuth2User> getUser(String sessionId);
    
    /**
     * Refreshes the authorized client for the given session ID
     * 
     * @param sessionId The session ID
     * @param client The new authorized OAuth2 client
     */
    void refreshClient(String sessionId, OAuth2AuthorizedClient client);
    
    /**
     * Invalidates the session with the given ID
     * 
     * @param sessionId The session ID
     */
    void invalidateSession(String sessionId);
    
    /**
     * Checks if the session with the given ID is valid
     * 
     * @param sessionId The session ID
     * @return true if the session is valid, false otherwise
     */
    boolean isValidSession(String sessionId);
}