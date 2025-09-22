import { BaseDTO } from '../models/base.model';

/**
 * Enumeration of possible data source statuses
 * @enum {string}
 */
export enum DataSourceStatus {
  /** Data source is currently being configured */
  CONFIGURING = 'configuring',
  /** Data source is active and operational */
  ACTIVE = 'active',
  /** Data source has encountered an error */
  ERROR = 'error',
  /** Data source is temporarily paused */
  PAUSED = 'paused',
  /** Data source is down or unavailable */
  DOWN = 'down',
}

/**
 * Configuration options for a data source
 * @interface DataSourceConfig
 */
export interface DataSourceConfig {
  /** Frequency of data synchronization */
  syncFrequency: 'daily' | 'hourly';
  /** Number of retry attempts for failed operations (optional) */
  retryAttempts?: number;
  /** Timeout duration in milliseconds (optional) */
  timeout?: number;
}

/**
 * Data Transfer Object for data source information
 * @interface DatasourceDTO
 * @extends {BaseDTO}
 */
export interface DatasourceDTO extends BaseDTO {
  /** Current status of the data source */
  status: DataSourceStatus;
  /** Configuration settings for the data source */
  config: DataSourceConfig;
  /** Unique identifier for the tenant this data source belongs to */
  tenantId: string;
}

/**
 * Abstract base class for data source implementations
 *
 * This class provides a common interface and base functionality for all data sources
 * in the Elevio system. It handles core properties like status tracking, configuration
 * management, and tenant isolation.
 *
 * @abstract
 * @class Datasource
 * @implements {DatasourceDTO}
 *
 * @example
 * ```typescript
 * class MyDatasource extends Datasource {
 *   // Implementation specific to your data source
 * }
 *
 * const datasource = new MyDatasource(
 *   'ds-123',
 *   'tenant-456',
 *   DataSourceStatus.ACTIVE,
 *   { syncFrequency: 'hourly', retryAttempts: 3 },
 *   null,
 *   new Date(),
 *   new Date()
 * );
 * ```
 */
export abstract class Datasource implements DatasourceDTO {
  /** Unique identifier for the data source */
  public readonly id: string;
  /** Unique identifier for the tenant this data source belongs to */
  public readonly tenantId: string;
  /** Current operational status of the data source */
  public status: DataSourceStatus;
  /** Configuration settings for the data source */
  public config: DataSourceConfig;
  /** Timestamp of the last successful synchronization, null if never synced */
  public lastSyncAt: Date | null;
  /** Timestamp when the data source was created */
  public createdAt: Date;
  /** Timestamp when the data source was last updated */
  public updatedAt: Date;

  /**
   * Creates a new Datasource instance
   *
   * @param {string} id - Unique identifier for the data source
   * @param {string} tenantId - Unique identifier for the tenant
   * @param {DataSourceStatus} status - Initial status of the data source
   * @param {DataSourceConfig} config - Configuration settings for the data source
   * @param {Date | null} lastSyncAt - Timestamp of last sync, null if never synced
   * @param {Date} createdAt - Timestamp when the data source was created
   * @param {Date} updatedAt - Timestamp when the data source was last updated
   *
   * @throws {Error} Throws an error if required parameters are invalid
   *
   * @example
   * ```typescript
   * const datasource = new MyDatasource(
   *   'ds-123',
   *   'tenant-456',
   *   DataSourceStatus.CONFIGURING,
   *   { syncFrequency: 'daily' },
   *   null,
   *   new Date(),
   *   new Date()
   * );
   * ```
   */
  constructor(
    id: string,
    tenantId: string,
    status: DataSourceStatus,
    config: DataSourceConfig,
    lastSyncAt: Date | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.tenantId = tenantId;
    this.status = status;
    this.config = config;
    this.lastSyncAt = lastSyncAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
