const Anthropic = require('@anthropic-ai/sdk');
const { Client: SquareClient } = require('square');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const square = new SquareClient({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: 'production'
});

const SQUARE_SITE = "https://aiakska.square.site/";
const LOCATION_ID = "LCX039E7QRA5G";

// SKA Training Packages mapped to Square
const SKA_PACKAGES = {
  foundation: {
    name: "Foundation Training",
    price: 5497,
    currency: "USD",
    description: "Complete SKA Foundation: Core AI agents, lead generation, basic automation"
  },
  professional: {
    name: "Professional Training",
    price: 29997,
    currency: "USD",
    description: "Professional SKA: 15+ agents, advanced automation, revenue optimization"
  },
  master: {
    name: "Master Training",
    price: 97000,
    currency: "USD",
    description: "Master SKA: 22+ agents, full automation suite, RKL Framework access"
  },
  elite: {
    name: "Elite Training",
    price: 397000,
    currency: "USD",
    description: "Elite SKA: All 25 agents, complete system, white-label licensing"
  }
};

// Monthly Automation Subscriptions
const MONTHLY_TIERS = {
  starter: {
    name: "Starter Automation",
    price: 197,
    agents: 8,
    description: "8 AI agents, 10K leads/month, basic automation"
  },
  professional: {
    name: "Professional Automation",
    price: 1997,
    agents: 15,
    description: "15 AI agents, 50K leads/month, advanced automation"
  },
  business: {
    name: "Business Automation",
    price: 9997,
    agents: 20,
    description: "20 AI agents, 200K leads/month, enterprise automation"
  },
  empire: {
    name: "Empire Automation",
    price: 99997,
    agents: 25,
    description: "All 25 AI agents, unlimited leads, complete automation empire"
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
      case 'get_products':
        return await getSquareProducts(headers);
      case 'create_checkout':
        return await createCheckoutSession(body, headers);
      case 'process_payment':
        return await processPayment(body, headers);
      case 'sync_inventory':
        return await syncInventoryToSquare(headers);
      case 'get_site_info':
        return getSiteInfo(headers);
      default:
        return getSiteInfo(headers);
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function getSiteInfo(headers) {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      site_url: SQUARE_SITE,
      location_id: LOCATION_ID,
      status: 'operational',
      integrated_systems: [
        'SKA Training Packages',
        'Monthly Automation Subscriptions',
        'Lead Generation Services',
        'White Label Licensing',
        'Consulting Services',
        'Custom Solutions'
      ],
      payment_methods: ['Credit Card', 'Debit Card', 'Digital Wallets'],
      currency: 'USD',
      training_packages: SKA_PACKAGES,
      monthly_tiers: MONTHLY_TIERS
    })
  };
}

async function getSquareProducts(headers) {
  try {
    const { result } = await square.catalogApi.listCatalog(undefined, 'ITEM');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'success',
        products: result.objects || [],
        count: result.objects?.length || 0,
        square_site: SQUARE_SITE
      })
    };
  } catch (error) {
    // Return our products even if Square API fails
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'local_catalog',
        training_packages: SKA_PACKAGES,
        monthly_tiers: MONTHLY_TIERS,
        square_site: SQUARE_SITE
      })
    };
  }
}

async function createCheckoutSession(data, headers) {
  const { package_type, tier, customer_email } = data;
  
  let item, price;
  
  if (package_type === 'training') {
    item = SKA_PACKAGES[tier];
    price = item.price;
  } else if (package_type === 'monthly') {
    item = MONTHLY_TIERS[tier];
    price = item.price;
  }

  if (!item) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid package or tier' })
    };
  }

  try {
    // Create Square checkout
    const { result } = await square.checkoutApi.createPaymentLink({
      idempotencyKey: `ska-${Date.now()}`,
      order: {
        locationId: LOCATION_ID,
        lineItems: [{
          name: item.name,
          quantity: '1',
          basePriceMoney: {
            amount: price * 100,
            currency: 'USD'
          }
        }]
      },
      checkoutOptions: {
        redirectUrl: `${SQUARE_SITE}?success=true`,
        askForShippingAddress: false
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'checkout_created',
        checkout_url: result.paymentLink?.url || `${SQUARE_SITE}`,
        item: item.name,
        price: `$${price.toLocaleString()}`,
        description: item.description
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'manual_checkout',
        square_site: SQUARE_SITE,
        item: item.name,
        price: `$${price.toLocaleString()}`,
        note: 'Visit Square site to complete purchase'
      })
    };
  }
}

async function processPayment(data, headers) {
  const { source_id, amount, package_type, tier } = data;

  try {
    const { result } = await square.paymentsApi.createPayment({
      sourceId: source_id,
      amountMoney: {
        amount: amount * 100,
        currency: 'USD'
      },
      locationId: LOCATION_ID,
      note: `SKA ${package_type} - ${tier}`
    });

    // Grant access based on package
    const access = grantAccess(package_type, tier);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'payment_successful',
        payment_id: result.payment?.id,
        amount: `$${amount.toLocaleString()}`,
        access_granted: access,
        onboarding_url: 'https://saleskingacademy.com/mobile.html'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        square_site: SQUARE_SITE
      })
    };
  }
}

async function syncInventoryToSquare(headers) {
  // Sync our SKA packages to Square catalog
  const items = [];
  
  for (const [key, pkg] of Object.entries(SKA_PACKAGES)) {
    items.push({
      type: 'training',
      tier: key,
      name: pkg.name,
      price: pkg.price,
      description: pkg.description
    });
  }
  
  for (const [key, tier] of Object.entries(MONTHLY_TIERS)) {
    items.push({
      type: 'monthly',
      tier: key,
      name: tier.name,
      price: tier.price,
      agents: tier.agents,
      description: tier.description
    });
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: 'inventory_synced',
      total_items: items.length,
      training_packages: 4,
      monthly_tiers: 4,
      items,
      square_site: SQUARE_SITE,
      note: 'Add these to Square dashboard manually or via Square API'
    })
  };
}

function grantAccess(package_type, tier) {
  if (package_type === 'training') {
    const pkg = SKA_PACKAGES[tier];
    return {
      type: 'training',
      tier,
      access: 'lifetime',
      value: `$${pkg.price.toLocaleString()}`
    };
  } else if (package_type === 'monthly') {
    const monthly = MONTHLY_TIERS[tier];
    return {
      type: 'subscription',
      tier,
      agents: monthly.agents,
      recurring: 'monthly',
      value: `$${monthly.price.toLocaleString()}/mo`
    };
  }
}
