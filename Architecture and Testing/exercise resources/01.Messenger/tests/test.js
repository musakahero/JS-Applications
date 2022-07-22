const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

describe('E2E tests', async function() {
    this.timeout(5000);
  before(async () => { browser = await chromium.launch(); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); }); 

    it('load all messages', async () => {
        
        await page.goto('http://localhost:5500');
        await page.click('text=Refresh');
        await page.waitForTimeout(2000);

        const res = await fetch('http://localhost:3030/jsonstore/messenger');
        const data = await res.json();
        const result = Object.values(data).map(v => `${v.author}: ${v.content}`).join('\n');
        
        const content = await page.inputValue('#messages');
        expect(content).to.equal(result);
    })
});
