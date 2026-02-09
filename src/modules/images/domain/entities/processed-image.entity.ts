export class ProcessedImageEntity {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly objectKey: string,
  ) {}
}
