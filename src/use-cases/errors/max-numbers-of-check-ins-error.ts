export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('The maximum number of check-ins in the same day has been reached.')
  }
}
