import { SECRET_API_KEY, SECRET_ORG } from '$env/static/private'

export const load = async () => {
  return {
     config: {
       organization: SECRET_ORG,
       apiKey: SECRET_API_KEY,
     }
  };
};
