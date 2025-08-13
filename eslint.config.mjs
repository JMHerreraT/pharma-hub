import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Convert legacy shareable configs (Airbnb, Prettier, Next) into Flat config
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Base ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "*.config.*",
      "next-env.d.ts",
      "**/*.d.ts.map",
      ".prettierrc.*",
    ],
  },

  // Apply Airbnb + Next + Prettier
  ...compat.extends("airbnb", "airbnb-typescript", "next", "prettier"),

  // TypeScript project settings (apply only to src and app to avoid config files)
  {
    files: ["src/**/*.{ts,tsx}", "app/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      "import/resolver": { typescript: {} },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        { devDependencies: ["**/*.config.*", "scripts/**", "**/eslint.config.*"] },
      ],
    },
  },
];
