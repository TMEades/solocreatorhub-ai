/**
 * Database Synchronization Utility
 * 
 * This utility handles synchronization between MySQL and MongoDB data
 * for the hybrid database architecture of SoleCreatorHub AI.
 */

import axios from 'axios';
import { API_URL } from '../config';

interface SyncOptions {
  entities?: string[];
  forceSync?: boolean;
  onProgress?: (progress: number) => void;
}

/**
 * Synchronizes data between MySQL and MongoDB
 * 
 * MySQL stores structured data like:
 * - User accounts
 * - Platform connections
 * - Subscriptions
 * - Teams and permissions
 * 
 * MongoDB stores flexible/content data like:
 * - Posts and media
 * - Content library items
 * - Analytics data
 * - Hashtags and trends
 */
export const syncDatabases = async (options: SyncOptions = {}) => {
  const { entities = ['all'], forceSync = false, onProgress } = options;
  
  try {
    // Start sync process
    onProgress?.(0);
    
    // Request sync from the server
    const response = await axios.post(`${API_URL}/sync`, {
      entities,
      forceSync
    });
    
    onProgress?.(100);
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Database sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown sync error'
    };
  }
};

/**
 * Validates data consistency between databases
 */
export const validateDataConsistency = async () => {
  try {
    const response = await axios.get(`${API_URL}/validate-consistency`);
    return {
      success: true,
      isConsistent: response.data.isConsistent,
      issues: response.data.issues || []
    };
  } catch (error) {
    console.error('Data consistency validation error:', error);
    return {
      success: false,
      isConsistent: false,
      error: error instanceof Error ? error.message : 'Unknown validation error'
    };
  }
};

export default {
  syncDatabases,
  validateDataConsistency
};
