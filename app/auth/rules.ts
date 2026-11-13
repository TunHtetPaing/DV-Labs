export const USERNAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function yearsAgoUtc(years: number, now = new Date()) {
  return Date.UTC(
    now.getUTCFullYear() - years,
    now.getUTCMonth(),
    now.getUTCDate(),
  );
}

export function isUsernameTakenError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("duplicate") ||
    normalized.includes("already exists") ||
    normalized.includes("profiles_username_lower_idx") ||
    normalized.includes("database error saving new user")
  );
}

export function fallbackUsernameSuggestions(username: string) {
  const suggestions: string[] = [];

  for (let n = 1; n <= 99 && suggestions.length < 3; n += 1) {
    const candidate = `${username}${n}`;
    if (USERNAME_PATTERN.test(candidate)) {
      suggestions.push(candidate);
    }
  }

  return suggestions;
}

export function signupFieldError(
  input: {
    username: string;
    dateOfBirth: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  now = new Date(),
): string | null {
  if (
    !input.username ||
    !input.dateOfBirth ||
    !input.email ||
    !input.password
  ) {
    return "Username, date of birth, email, and password are required.";
  }

  if (!USERNAME_PATTERN.test(input.username)) {
    return "Username must be 3–20 characters, start with a letter, and contain only letters, numbers, and underscores.";
  }

  const dateOfBirthMs = Date.parse(`${input.dateOfBirth}T00:00:00.000Z`);
  if (Number.isNaN(dateOfBirthMs)) {
    return "Enter a valid date of birth.";
  }

  if (dateOfBirthMs > yearsAgoUtc(13, now)) {
    return "You must be at least 13 years old.";
  }

  if (dateOfBirthMs < yearsAgoUtc(120, now)) {
    return "Enter a valid date of birth.";
  }

  if (!PASSWORD_PATTERN.test(input.password)) {
    return "Password must be at least 8 characters and include a letter, a number, and a special character.";
  }

  if (input.password !== input.confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}
