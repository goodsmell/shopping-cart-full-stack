

export class BadRequestError extends Error {
  data;

  constructor(data: Record<string, string>) {
    super('Bad Request');
    this.name = 'BadRequestError';
    this.data = data;
  }
}

export class NotFoundError extends Error {
  data;

  constructor(data: Record<string, string>) {
    super('Not Found');
    this.name = 'NotFoundError';
    this.data = data;
  }
}
