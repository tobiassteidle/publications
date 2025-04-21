#!/bin/bash

# Create the Keycloak realm, client, and test user for the Deka Versandjob application

KEYCLOAK_URL="http://localhost:8081"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin"
REALM_NAME="deka"
CLIENT_ID="deka-client"
CLIENT_SECRET="your-client-secret"
REDIRECT_URI="http://localhost:8080/api/login/oauth2/code/keycloak"

# Wait for Keycloak to be accessible
echo "Waiting for Keycloak to be ready..."
while ! curl -s $KEYCLOAK_URL > /dev/null; do
    sleep 2
done
echo "Keycloak is accessible."

# Get admin token
echo "Getting admin token..."
ADMIN_TOKEN=$(curl -s -X POST "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=$ADMIN_USERNAME" \
    -d "password=$ADMIN_PASSWORD" \
    -d "grant_type=password" \
    -d "client_id=admin-cli" | grep -o '"access_token":"[^"]*' | sed 's/"access_token":"//')

if [ -z "$ADMIN_TOKEN" ]; then
    echo "Failed to get admin token. Please check Keycloak is running and credentials are correct."
    exit 1
fi

echo "Successfully obtained admin token."

# Check if realm already exists
REALM_EXISTS=$(curl -s -X GET "$KEYCLOAK_URL/admin/realms" \
    -H "Authorization: Bearer $ADMIN_TOKEN" | grep -c "\"realm\":\"$REALM_NAME\"")

if [ "$REALM_EXISTS" -gt 0 ]; then
    echo "Realm '$REALM_NAME' already exists. Deleting it first..."
    curl -s -X DELETE "$KEYCLOAK_URL/admin/realms/$REALM_NAME" \
        -H "Authorization: Bearer $ADMIN_TOKEN"
    echo "Realm deleted."
    sleep 2
fi

# Create realm
echo "Creating realm '$REALM_NAME'..."
curl -s -X POST "$KEYCLOAK_URL/admin/realms" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "realm": "'$REALM_NAME'",
        "enabled": true,
        "displayName": "Deka Versandjobs",
        "sslRequired": "external"
    }'

sleep 2
echo "Realm created."

# Create client
echo "Creating client '$CLIENT_ID'..."
curl -s -X POST "$KEYCLOAK_URL/admin/realms/$REALM_NAME/clients" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "clientId": "'$CLIENT_ID'",
        "name": "Deka Versandjobs Client",
        "enabled": true,
        "publicClient": false,
        "secret": "'$CLIENT_SECRET'",
        "redirectUris": ["'$REDIRECT_URI'"],
        "webOrigins": ["http://localhost:4200"],
        "standardFlowEnabled": true,
        "implicitFlowEnabled": false,
        "directAccessGrantsEnabled": true,
        "authorizationServicesEnabled": false,
        "fullScopeAllowed": true
    }'

sleep 2
echo "Client created."

# Create test user
echo "Creating test user 'testuser'..."
curl -s -X POST "$KEYCLOAK_URL/admin/realms/$REALM_NAME/users" \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "username": "testuser",
        "enabled": true,
        "emailVerified": true,
        "firstName": "Test",
        "lastName": "User",
        "email": "test@example.com",
        "credentials": [
            {
                "type": "password",
                "value": "password",
                "temporary": false
            }
        ]
    }'

echo "Test user created."
echo ""
echo "==================================================================="
echo "Setup completed successfully!"
echo "Keycloak URL: $KEYCLOAK_URL"
echo "Realm: $REALM_NAME"
echo "Client ID: $CLIENT_ID"
echo "Client Secret: $CLIENT_SECRET"
echo "Redirect URI: $REDIRECT_URI"
echo "Test User: testuser / password"
echo "==================================================================="
echo ""
echo "Please update these values in your application configuration."
