# Simple JWT Authentication

A clean and simple JWT implementation for the invoice app.

## Files

- `auth.service.ts` - Login logic and JWT token creation
- `auth.controller.ts` - Single login endpoint
- `jwt.strategy.ts` - JWT token validation
- `jwt-auth.guard.ts` - Route protection
- `local.strategy.ts` - Username/password validation

## Usage

### Login
```bash
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com", 
    "name": "User Name"
  }
}
```

### Protected Routes
Add `@UseGuards(JwtAuthGuard)` to controllers or methods:

```typescript
@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  @Get()
  findAll(@Request() req) {
    // req.user contains { userId, email }
    return this.invoicesService.findAll(req.user.userId);
  }
}
```

## Environment Variables

```env
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"  # optional, defaults to 7d
```

That's it! Simple and effective. 🚀
