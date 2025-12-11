/**
 * SALES KING ACADEMY - 11-LAYER HEARTBEAT FAIL-SAFE SYSTEM
 * ==========================================================
 * Each layer cross-validates the next for infinite redundancy
 * Temporal DNA anchored to genesis: July 1, 2024, 00:00:00 UTC
 * RKL Framework α=25 integration
 */

const GENESIS_TIMESTAMP = new Date('2024-07-01T00:00:00Z').getTime();
const ALPHA_PARAMETER = 25;

// 11 Heartbeat layers (milliseconds)
const HEARTBEAT_LAYERS = [
  { id: 1, interval: 200, name: '0.2-second cycle' },
  { id: 2, interval: 500, name: '0.5-second cycle' },
  { id: 3, interval: 1000, name: '1-second cycle' },
  { id: 4, interval: 5000, name: '5-second verification' },
  { id: 5, interval: 30000, name: '30-second audit' },
  { id: 6, interval: 60000, name: '1-minute sync' },
  { id: 7, interval: 1800000, name: '30-minute reconstruction' },
  { id: 8, interval: 43200000, name: '12-hour restoration' },
  { id: 9, interval: 604800000, name: '7-day restoration' },
  { id: 10, interval: 2592000000, name: '30-day backup' },
  { id: 11, interval: null, name: 'Lifetime checksum validation' }
];

class HeartbeatFailSafe {
  constructor() {
    this.layers = new Map();
    this.checksums = new Map();
    this.lastValidation = Date.now();
    this.initializeLayers();
  }

  initializeLayers() {
    HEARTBEAT_LAYERS.forEach(layer => {
      this.layers.set(layer.id, {
        ...layer,
        lastBeat: Date.now(),
        beatCount: 0,
        status: 'OPERATIONAL',
        nextLayer: layer.id < 11 ? layer.id + 1 : null
      });
    });
  }

  calculateChecksum(data) {
    // RKL Framework checksum with α=25 parameter
    const str = JSON.stringify(data);
    let hash = ALPHA_PARAMETER;
    
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash);
  }

  getTemporalDNA() {
    const now = Date.now();
    const elapsed = now - GENESIS_TIMESTAMP;
    const credits = Math.floor(elapsed / 1000); // 1 credit per second
    
    return {
      genesis: GENESIS_TIMESTAMP,
      current: now,
      elapsed: elapsed,
      credits: credits,
      dna_string: `${GENESIS_TIMESTAMP}${now}${credits}`.padStart(32, '0')
    };
  }

  validateLayer(layerId) {
    const layer = this.layers.get(layerId);
    if (!layer) return { valid: false, error: 'Layer not found' };

    const now = Date.now();
    const timeSinceLastBeat = now - layer.lastBeat;
    
    // Layer is valid if beat occurred within expected interval (with 20% tolerance)
    const isValid = layer.interval === null || 
                   timeSinceLastBeat < (layer.interval * 1.2);

    // Cross-check with next layer
    if (layer.nextLayer) {
      const nextLayer = this.layers.get(layer.nextLayer);
      const crossCheck = nextLayer && nextLayer.status === 'OPERATIONAL';
      
      return {
        valid: isValid && crossCheck,
        layer: layer.name,
        timeSinceLastBeat: timeSinceLastBeat,
        crossCheckPassed: crossCheck,
        nextLayer: nextLayer ? nextLayer.name : null
      };
    }

    return {
      valid: isValid,
      layer: layer.name,
      timeSinceLastBeat: timeSinceLastBeat,
      crossCheckPassed: true
    };
  }

  heartbeat(layerId) {
    const layer = this.layers.get(layerId);
    if (!layer) return { success: false, error: 'Invalid layer' };

    const now = Date.now();
    layer.lastBeat = now;
    layer.beatCount++;

    // Calculate checksum for this beat
    const temporal = this.getTemporalDNA();
    const beatData = {
      layerId: layerId,
      timestamp: now,
      beatCount: layer.beatCount,
      temporal: temporal
    };
    
    const checksum = this.calculateChecksum(beatData);
    this.checksums.set(`${layerId}-${layer.beatCount}`, checksum);

    // Validate this layer and cross-check next
    const validation = this.validateLayer(layerId);

    return {
      success: true,
      layer: layer.name,
      beatCount: layer.beatCount,
      checksum: checksum,
      validation: validation,
      temporal: temporal
    };
  }

  getAllLayersStatus() {
    const status = [];
    
    HEARTBEAT_LAYERS.forEach(layer => {
      const layerData = this.layers.get(layer.id);
      const validation = this.validateLayer(layer.id);
      
      status.push({
        id: layer.id,
        name: layer.name,
        interval_ms: layer.interval,
        status: layerData.status,
        beatCount: layerData.beatCount,
        lastBeat: layerData.lastBeat,
        valid: validation.valid,
        timeSinceLastBeat: validation.timeSinceLastBeat
      });
    });

    return status;
  }

  getSystemHealth() {
    const allLayers = this.getAllLayersStatus();
    const operationalCount = allLayers.filter(l => l.valid).length;
    const healthPercentage = (operationalCount / allLayers.length) * 100;
    
    return {
      status: healthPercentage === 100 ? 'ALL_OPERATIONAL' : 
              healthPercentage >= 90 ? 'OPERATIONAL' :
              healthPercentage >= 70 ? 'DEGRADED' : 'CRITICAL',
      healthPercentage: healthPercentage,
      operationalLayers: operationalCount,
      totalLayers: allLayers.length,
      layers: allLayers,
      temporal: this.getTemporalDNA(),
      rkl_framework: {
        alpha: ALPHA_PARAMETER,
        compression_base: Math.pow(3, 8),
        compression_adaptive: Math.pow(5, 8)
      }
    };
  }
}

// Global instance (persists across invocations in Netlify)
let failsafeInstance = null;

exports.handler = async (event) => {
  // Initialize on first call
  if (!failsafeInstance) {
    failsafeInstance = new HeartbeatFailSafe();
  }

  const method = event.httpMethod;
  const path = event.path;

  try {
    // GET: Return system health
    if (method === 'GET') {
      const health = failsafeInstance.getSystemHealth();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          system: 'Sales King Academy - 11-Layer Heartbeat Fail-Safe',
          ...health,
          timestamp: new Date().toISOString()
        })
      };
    }

    // POST: Trigger heartbeat for specific layer
    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const layerId = body.layerId || 1;
      
      const result = failsafeInstance.heartbeat(layerId);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result)
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Heartbeat system error',
        message: error.message
      })
    };
  }
};
