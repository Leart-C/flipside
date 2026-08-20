# Flipside threat model

## Sensitive assets

Flipside will protect:

- User accounts and sessions
- Original photos
- Written memories
- Delivery names and addresses
- Print orders
- Subscription entitlements
- Authentication and payment tokens

## Trust boundaries

### Mobile application

The mobile application is not trusted. A user or attacker can modify it, inspect its traffic, and call backend endpoints without using the interface.

The mobile application must never be the final authority for:

- Resource ownership
- Subscription access
- Prices
- Print quantities
- Order totals
- Upload limits
- Administrative permissions

### Backend

The Next.js backend is the public application boundary. Every protected endpoint must:

1. Authenticate the request.
2. Validate its input.
3. Authorize access to the requested resource.
4. Perform the operation.
5. Return only the required data.

### Database

PostgreSQL stores application records and ownership relationships. Database access is available only to the backend and controlled workers.

### Photo storage

Photos are stored in private object storage. Clients access them through short-lived signed operations issued by the backend.

### External providers

Clerk, payment providers, and print providers are external trust boundaries. Incoming webhooks must be signature-verified and processed idempotently.

## Security requirements

- Never place server secrets in `EXPO_PUBLIC_` variables.
- Never trust user identifiers supplied by the client.
- Derive the current user from the verified session.
- Check ownership on every memory, photo, and order operation.
- Validate request bodies and uploaded-file metadata.
- Restrict upload size and accepted content types.
- Strip unnecessary image metadata before long-term storage.
- Use rate limits on authentication-sensitive and expensive operations.
- Redact personal data, tokens, and private URLs from logs.
- Use least-privilege credentials for each deployed service.
- Record security-relevant actions in an audit trail.
- Support user-data export and deletion.
- Keep dependencies patched and review security advisories.

## Initial abuse cases

- A user requests another user’s memory by changing an ID.
- An attacker uploads an oversized or invalid file.
- A user changes an order price in the mobile request.
- A webhook is replayed to create duplicate orders.
- An attacker repeatedly requests image processing.
- A private photo URL is exposed in logs.
- A session token is stored insecurely on the device.
- Automated account creation is used for free-print abuse.

Each backend feature must address its relevant abuse cases before being considered complete.