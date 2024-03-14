export class ExpiredCheckInError extends Error {
  constructor() {
    super('CheckIn is Expired')
  }
}
