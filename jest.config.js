module.exports = {
	preset: 'ts-jest/presets/js-with-ts',
	testEnvironment: 'jsdom',
	moduleDirectories: ['node_modules', 'src'],
	modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
	moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node', 'html'],
	  "roots": [
	    "<rootDir>/test"
	  ],
	"testMatch": [
		"**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[jt]s?(x)"
	],
	"transform": {
	   "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
	   "^.+\\.ts?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
	},
	moduleNameMapper: {
	    "\\.(scss|css|sass)$": "identity-obj-proxy"
	},
	  globals: {
	    'ts-jest': {
	      tsConfig: './tsconfig.json'
	    }
	  },
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupTestFrameworkScriptFile": "<rootDir>/setup-enzyme.ts",
}
