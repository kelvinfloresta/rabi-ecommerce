export class NotFound extends Error {
  constructor(params: { resource: string; id: string }) {
    super(`Not found resource "${params.resource}" with id "${params.id}"`);
    this.name = 'NotFound';
  }
}
