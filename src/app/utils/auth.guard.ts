import { Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from './auth.service'

export const authGuard = () => {

  const authService = inject(AuthService)
  const router = inject(Router)

  if (!authService.userToken) {
    router.navigate(['/login'])
    return false
  }
  return true
}