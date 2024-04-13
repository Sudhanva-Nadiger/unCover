type Plan = {
  name: 'Free'| 'Pro';
  slug: 'free'| 'pro';
  resumeCount: 3 | 10_00_00_000;
  pagesPerPdf: 1 | 4;
  fileSize: 1 | 4;
  price: {
    amount: 0 | 5;
    priceIds: {
      test: string;
      production: string;
    };
  };
}

export const PLANS: Plan[] = [
    {
      name: 'Free',
      slug: 'free',
      resumeCount: 3,
      pagesPerPdf: 1,
      fileSize: 1,
      price: {
        amount: 0,
        priceIds: {
          test: '',
          production: '',
        },
      },
    },
    {
      name: 'Pro',
      slug: 'pro',
      resumeCount: 100000000,
      pagesPerPdf: 4,
      fileSize: 1,
      price: {
        amount: 5,
        priceIds: {
          test: 'price_1P4QNcSINphFP3PtY8eBUey8',
          production: '',
        },
      },
    },
  ]