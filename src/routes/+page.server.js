// import { SECRET_API_KEY, SECRET_ORG } from '$env/static/private'

import { key, org } from '$lib/secrets';

export const load = async () => {
  return {
     config: {
       organization: org,
       apiKey: key,
     }
  };
};
