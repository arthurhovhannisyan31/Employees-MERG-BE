"use strict";
module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
    coverageThreshold: {
        global: {
            branches: 5,
            functions: 5,
            lines: 5,
            statements: 5,
        },
    },
    globals: {
        'ts-jest': {
            tsConfigFile: 'configs/ts-config/tsconfig.jest.json',
            enableTsDiagnostics: true,
        },
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    moduleNameMapper: {
        '_/(.*)': '<rootDir>/src/$1',
    },
    notify: true,
    notifyMode: 'failure-change',
    setupFiles: ['<rootDir>/configs/jest/utils/polyfill.ts'],
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
