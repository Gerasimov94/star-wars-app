/// <reference types="vite/client" />
import { afterAll, beforeAll, describe, test } from 'vitest';
import { preview } from 'vite';
import type { PreviewServer } from 'vite';
import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import { expect } from '@playwright/test';

// unstable in Windows, TODO: investigate
describe.runIf(process.platform !== 'win32')('basic', async () => {
	let server: PreviewServer;
	let browser: Browser;
	let page: Page;

	beforeAll(async () => {
		server = await preview({ preview: { port: 3000 } });
		browser = await chromium.launch();
		page = await browser.newPage();
	});

	test('Gender filter must be rendered', async () => {
		await page.goto('http://localhost:3000/');
		const filterText = page.getByText('Pick characters gender: ');
		await expect(filterText).toBeVisible();
	}, 10_000);

	test('Input changes state', async () => {
		await page.goto('http://localhost:3000/');
		const input = page.getByPlaceholder('Enter your character');
		await input.fill('Luke');
		const value = await input.inputValue();
		await expect(value).toBe('Luke');
	}, 10_000);

	afterAll(async () => {
		await browser.close();
		await new Promise<void>((resolve, reject) => {
			server.httpServer.close((error) => (error ? reject(error) : resolve()));
		});
	});
});
