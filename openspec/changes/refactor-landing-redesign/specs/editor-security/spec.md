## ADDED Requirements

### Requirement: Authenticated content writes
The content-write endpoint (`/api/save-content`) SHALL reject any request that does not carry a valid, server-verified authentication credential. Authorization SHALL be enforced on the server, never inferred from client-side state such as `localStorage`.

#### Scenario: Unauthenticated write is rejected
- **WHEN** a client POSTs content to the write endpoint without a valid session/token
- **THEN** the server responds with HTTP 401 and does not modify any content or trigger a deploy

#### Scenario: Authenticated write succeeds
- **WHEN** a client that has logged in with valid credentials POSTs content with its session/token
- **THEN** the server verifies the credential server-side and persists the content

#### Scenario: Forged client state does not grant access
- **WHEN** a client sets `localStorage.editorAuth = "true"` but holds no valid server credential
- **THEN** the write endpoint still responds with HTTP 401

### Requirement: Hashed credentials
Stored editor credentials SHALL be kept as salted password hashes. The system SHALL NOT compare passwords in plaintext.

#### Scenario: Login verifies against a hash
- **WHEN** a user submits a password at login
- **THEN** the server verifies it against a stored salted hash and never against a plaintext value

#### Scenario: No plaintext secret at rest
- **WHEN** editor credentials are configured (file or env var)
- **THEN** they contain only hashes, not recoverable plaintext passwords

### Requirement: Rate limiting on auth and write endpoints
The login and content-write endpoints SHALL apply rate limiting to mitigate brute-force and abuse.

#### Scenario: Repeated failed logins are throttled
- **WHEN** a client exceeds the allowed number of failed login attempts within the window
- **THEN** further attempts are rejected with HTTP 429 until the window resets

### Requirement: No squatter dependencies
The project SHALL NOT depend on the `child_process` npm package (a squatter shadowing the Node.js builtin).

#### Scenario: Dependency removed
- **WHEN** `app/package.json` dependencies are inspected
- **THEN** `child_process` is absent and the app builds and runs without it
