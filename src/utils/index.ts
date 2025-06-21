// Generate a random username (e.g., "user-abc123")

export const genUsername = (): string => {
  const usernamePrefix = 'user-';
  const randomChars = Math.random().toString(36).slice(2, 8); // Generates a random string

  const username = usernamePrefix + randomChars;

  return username;
};

// Generate a random slug (e.g., "my-title-xyz789")

export const genSlug = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]\s-/g, '') // Remove special characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens

  const randomChars = Math.random().toString(36).slice(2, 8); // Generates a random string
  const uniqueSlug = `${slug}-${randomChars}`;

  return uniqueSlug;
};
