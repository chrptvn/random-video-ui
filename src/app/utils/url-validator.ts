import { Host } from '../models/host.model';

export class UrlValidator {
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static getHostFromUrl(url: string): string | null {
    try {
      const urlObject = new URL(url);
      return urlObject.hostname;
    } catch {
      return null;
    }
  }

  static isHostWhitelisted(url: string, whitelistedHosts: Host[]): boolean {
    const hostname = this.getHostFromUrl(url);
    if (!hostname) return false;

    return whitelistedHosts.some(host => 
      hostname.includes(host.name)
    );
  }
}