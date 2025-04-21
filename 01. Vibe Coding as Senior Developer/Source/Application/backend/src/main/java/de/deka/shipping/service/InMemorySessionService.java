package de.deka.shipping.service;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InMemorySessionService implements SessionService {

    private static class SessionData {
        private final OAuth2AuthorizedClient client;
        private final OAuth2User user;
        private final Instant created;
        private Instant lastAccessed;

        public SessionData(OAuth2AuthorizedClient client, OAuth2User user) {
            this.client = client;
            this.user = user;
            this.created = Instant.now();
            this.lastAccessed = Instant.now();
        }

        public OAuth2AuthorizedClient getClient() {
            return client;
        }

        public OAuth2User getUser() {
            return user;
        }

        public Instant getCreated() {
            return created;
        }

        public Instant getLastAccessed() {
            return lastAccessed;
        }

        public void updateLastAccessed() {
            this.lastAccessed = Instant.now();
        }
    }

    private final Map<String, SessionData> sessions = new ConcurrentHashMap<>();

    @Override
    public String createSession(OAuth2AuthorizedClient client, OAuth2User user) {
        String sessionId = generateSessionId();
        sessions.put(sessionId, new SessionData(client, user));
        return sessionId;
    }

    @Override
    public Optional<OAuth2AuthorizedClient> getAuthorizedClient(String sessionId) {
        SessionData sessionData = sessions.get(sessionId);
        if (sessionData != null) {
            sessionData.updateLastAccessed();
            return Optional.of(sessionData.getClient());
        }
        return Optional.empty();
    }

    @Override
    public Optional<OAuth2User> getUser(String sessionId) {
        SessionData sessionData = sessions.get(sessionId);
        if (sessionData != null) {
            sessionData.updateLastAccessed();
            return Optional.of(sessionData.getUser());
        }
        return Optional.empty();
    }

    @Override
    public void refreshClient(String sessionId, OAuth2AuthorizedClient client) {
        SessionData sessionData = sessions.get(sessionId);
        if (sessionData != null) {
            sessions.put(sessionId, new SessionData(client, sessionData.getUser()));
        }
    }

    @Override
    public void invalidateSession(String sessionId) {
        sessions.remove(sessionId);
    }

    @Override
    public boolean isValidSession(String sessionId) {
        return sessions.containsKey(sessionId);
    }

    private String generateSessionId() {
        return UUID.randomUUID().toString();
    }
}