/**
 * Elevio Core - Real-time weak point detection system
 * Main entry point for the application
 */

export interface ElevioConfig {
  version: string;
  environment: 'development' | 'production' | 'test';
}

export class ElevioCore {
  private config: ElevioConfig;

  constructor(config: ElevioConfig) {
    this.config = config;
  }

  public initialize(): void {
    console.log(`Elevio Core v${this.config.version} initializing...`);
    console.log(`Environment: ${this.config.environment}`);
  }

  public getVersion(): string {
    return this.config.version;
  }

  public getEnvironment(): string {
    return this.config.environment;
  }
}

// Example usage
if (require.main === module) {
  const elevio = new ElevioCore({
    version: '0.0.1',
    environment: 'development',
  });

  elevio.initialize();
}

export default ElevioCore;
