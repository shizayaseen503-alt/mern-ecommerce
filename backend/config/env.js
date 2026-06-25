const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

const validateEnv = () => {
  const missing = requiredEnvVars.filter((key) => {
    const value = process.env[key];
    return !value || !String(value).trim();
  });

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || String(process.env.JWT_SECRET).length < 24) {
      throw new Error('JWT_SECRET must be at least 24 characters in production');
    }
  }
};

export { validateEnv };
