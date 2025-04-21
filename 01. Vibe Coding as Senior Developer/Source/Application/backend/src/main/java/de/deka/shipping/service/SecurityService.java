package de.deka.shipping.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    /**
     * Get the customer ID from the authenticated user
     * 
     * @param authentication The authentication object
     * @return The customer ID or null if not found
     */
    public String getCustomerId(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof OAuth2User)) {
            return null;
        }
        
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String sub = user.getAttribute("sub");
        
        // In a real application, you would map the subject ID to a customer ID
        // For simplicity, we'll just use the sub value
        return sub;
    }
}