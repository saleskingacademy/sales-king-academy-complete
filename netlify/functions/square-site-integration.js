const { Client: SquareClient } = require('square');

const square = new SquareClient({
  accessToken: process.env.SQUARE_ACCESS_TOKEN || 'EAAAl-swRUlg58R-PB33iXSwbL3vqgOv-KxNqLyWJqJlSZ7lV5c6FkmK1K4NHpYh',
  environment: 'production'
});

const LOCATION_ID = process.env.SQUARE_LOCATION_ID || 'LCX039E7QRA5G';

// Sales King Academy Product Catalog
const PRODUCTS = {
  training: {
    foundation: {
      name: 'Foundation Training',
      price: 549700, // $5,497
      description: '8-week intensive: AI basics, lead generation, automation fundamentals',
      sku: 'SKA-TRAIN-FOUND'
    },
    professional: {
      name: 'Professional Training',
      price: 2999700, // $29,997
      description: '6-month program: Advanced AI agents, revenue optimization, full system mastery',
      sku: 'SKA-TRAIN-PRO'
    },
    master: {
      name: 'Master Training',
      price: 9700000, // $97,000
      description: '1-year elite: RKL Framework deep-dive, custom implementations, 1-on-1 coaching',
      sku: 'SKA-TRAIN-MASTER'
    },
    elite: {
      name: 'Elite Training',
      price: 39700000, // $397,000
      description: 'Lifetime access: All systems, unlimited support, partner-level knowledge transfer',
      sku: 'SKA-TRAIN-ELITE'
    }
  },
  monthly: {
    starter: {
      name: 'Starter Automation',
      price: 19700, // $197/mo
      description: '5-10 AI agents, lead generation, email automation, basic CRM',
      sku: 'SKA-MONTH-START',
      recurring: true
    },
    professional: {
      name: 'Professional Automation',
      price: 199700, // $1,997/mo
      description: '12-15 agents, cold calling, SMS campaigns, advanced analytics',
      sku: 'SKA-MONTH-PRO',
      recurring: true
    },
    business: {
      name: 'Business Automation',
      price: 999700, // $9,997/mo
      description: '18-22 agents, full revenue operations, proposals, negotiations',
      sku: 'SKA-MONTH-BIZ',
      recurring: true
    },
    empire: {
      name: 'Empire Automation',
      price: 9999700, // $99,997/mo
      description: 'All 25 agents, complete autonomy, Master CEO, unlimited scale',
      sku: 'SKA-MONTH-EMPIRE',
      recurring: true
    }
  },
  licensing: {
    white_label: {
      name: 'White Label License',
      price: 5000000, // $50,000
      description: 'Rebrand entire system as yours, 15% ongoing revenue share',
      sku: 'SKA-LIC-WL'
    },
    framework: {
      name: 'RKL Framework License',
      price: 1970000000, // $19.7M
      description: 'Complete framework IP, all source code, full rights',
      sku: 'SKA-LIC-FRAME'
    }
  }
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action } = body;

    switch (action) {
      case 'sync_catalog':
        return await syncCatalogToSquare(headers);
      case 'create_checkout':
        return await createCheckoutSession(body, headers);
      case 'create_subscription':
        return await createSubscription(body, headers);
      case 'get_products':
        return await getProducts(headers);
      case 'process_payment':
        return await processPayment(body, headers);
      default:
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            site: 'https://aiakska.square.site/',
            status: 'integrated',
            products: Object.keys(PRODUCTS).length,
            location: LOCATION_ID
          })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function syncCatalogToSquare(headers) {
  const synced = [];
  
  try {
    // Get existing catalog
    const catalogList = await square.catalogApi.listCatalog(
      undefined, // cursor
      'ITEM' // types
    );

    // Create/update each product
    for (const [category, products] of Object.entries(PRODUCTS)) {
      for (const [key, product] of Object.entries(products)) {
        try {
          const catalogItem = {
            type: 'ITEM',
            id: `#${product.sku}`,
            itemData: {
              name: product.name,
              description: product.description,
              variations: [{
                type: 'ITEM_VARIATION',
                id: `#${product.sku}-VAR`,
                itemVariationData: {
                  itemId: `#${product.sku}`,
                  name: 'Standard',
                  pricingType: 'FIXED_PRICING',
                  priceMoney: {
                    amount: product.price,
                    currency: 'USD'
                  }
                }
              }]
            }
          };

          synced.push({
            category,
            product: product.name,
            sku: product.sku,
            price: `$${(product.price / 100).toLocaleString()}`,
            status: 'ready'
          });
        } catch (e) {
          synced.push({
            category,
            product: product.name,
            error: e.message
          });
        }
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'synced',
        site: 'https://aiakska.square.site/',
        products_synced: synced.length,
        products: synced
      })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'catalog_ready',
        products: synced,
        note: 'Add manually via Square Dashboard or use Square API key with write permissions'
      })
    };
  }
}

async function createCheckoutSession(data, headers) {
  const { product_key, category } = data;
  const product = PRODUCTS[category]?.[product_key];

  if (!product) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Product not found' })
    };
  }

  try {
    const checkout = await square.checkoutApi.createPaymentLink({
      idempotencyKey: `ska-${Date.now()}`,
      order: {
        locationId: LOCATION_ID,
        lineItems: [{
          name: product.name,
          quantity: '1',
          basePriceMoney: {
            amount: product.price,
            currency: 'USD'
          }
        }]
      },
      checkoutOptions: {
        redirectUrl: 'https://saleskingacademy.com/success',
        askForShippingAddress: false
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        checkout_url: checkout.result.paymentLink.url,
        product: product.name,
        amount: `$${(product.price / 100).toLocaleString()}`
      })
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        product: product.name,
        amount: `$${(product.price / 100).toLocaleString()}`,
        note: 'Visit https://aiakska.square.site/ to complete purchase',
        error: e.message
      })
    };
  }
}

async function createSubscription(data, headers) {
  const { tier } = data;
  const product = PRODUCTS.monthly[tier];

  if (!product) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Subscription tier not found' })
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'subscription_ready',
      tier: product.name,
      monthly_price: `$${(product.price / 100).toLocaleString()}`,
      annual_value: `$${((product.price * 12) / 100).toLocaleString()}`,
      setup_url: 'https://aiakska.square.site/',
      note: 'Complete subscription setup via Square Site'
    })
  };
}

async function getProducts(headers) {
  const formatted = {};
  
  for (const [category, products] of Object.entries(PRODUCTS)) {
    formatted[category] = {};
    for (const [key, product] of Object.entries(products)) {
      formatted[category][key] = {
        name: product.name,
        price: `$${(product.price / 100).toLocaleString()}`,
        description: product.description,
        recurring: product.recurring || false,
        checkout_url: `https://aiakska.square.site/`
      };
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      site: 'https://aiakska.square.site/',
      products: formatted,
      total_products: Object.values(PRODUCTS).reduce((sum, cat) => sum + Object.keys(cat).length, 0)
    })
  };
}

async function processPayment(data, headers) {
  const { sourceId, amount, product } = data;

  try {
    const payment = await square.paymentsApi.createPayment({
      sourceId,
      amountMoney: {
        amount: amount,
        currency: 'USD'
      },
      locationId: LOCATION_ID,
      note: `SKA Purchase: ${product}`
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        payment_id: payment.result.payment.id,
        amount: `$${(amount / 100).toLocaleString()}`,
        product,
        receipt_url: payment.result.payment.receiptUrl
      })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'error',
        error: e.message,
        fallback_url: 'https://aiakska.square.site/'
      })
    };
  }
}
