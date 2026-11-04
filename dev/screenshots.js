// Takes the WeJure screenshots in content/img/: signs up three users on a
// WeJure server at http://localhost:8020 with empty data, posts, builds a
// community, and saves feed.png, communities.png and community.png.
//
//   node dev/screenshots.js content/img
//
// Needs a WeJure checkout next to this repo (../wejure) with its npm
// dependencies and Playwright's Chromium installed; see the README.
const path = require('path');
const { chromium, expect } = require(path.resolve(__dirname, '../../wejure/node_modules/@playwright/test'));

const BASE = 'http://localhost:8020';
const OUT = process.argv[2];
const PASSWORD = 'correct-horse-77';
const VIEWPORT = { width: 1280, height: 720 };

async function newUser(browser) {
    const context = await browser.newContext({ baseURL: BASE, viewport: VIEWPORT });
    const page = await context.newPage();
    page.on('dialog', (d) => d.accept());
    return page;
}

async function signUp(page, name) {
    await page.goto('/register');
    const inputs = page.locator('input.MuiInputBase-input');
    await expect(inputs).toHaveCount(3);
    await inputs.nth(0).fill(name);
    await inputs.nth(1).fill(PASSWORD);
    await inputs.nth(2).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/login', { timeout: 30000 });
    const login = page.locator('input.MuiInputBase-input');
    await login.nth(0).fill(name);
    await login.nth(1).fill(PASSWORD);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page).toHaveURL(BASE + '/home', { timeout: 30000 });
}

async function post(page, text) {
    await page.goto('/home');
    await page.getByPlaceholder("What's on your mind?").fill(text);
    await page.getByRole('button', { name: 'Post' }).click();
    await expect(page.getByText(text)).toBeVisible();
    await expect(page.getByText('Sending…')).toHaveCount(0, { timeout: 30000 });
}

async function follow(page, name) {
    await page.goto('/user/' + name);
    await page.getByRole('button', { name: 'Follow', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Unfollow' })).toBeVisible();
}

// Sends a message in the selected channel, in a new topic or the selected one.
async function say(page, text, topic) {
    if (topic) await page.getByPlaceholder('Topic').fill(topic);
    await page.getByPlaceholder('Message').fill(text);
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText(text)).toBeVisible();
}

async function acceptInvitation(page, community) {
    await page.goto('/communities');
    await expect(page.getByText(community)).toBeVisible({ timeout: 30000 });
    await page.getByRole('button', { name: 'Accept' }).click();
    await page.getByRole('link', { name: community }).click();
    await expect(page.locator('h6', { hasText: community })).toBeVisible({ timeout: 30000 });
}

async function createChannel(page, dialog, name, who, member) {
    await dialog.getByLabel('New channel').fill(name);
    await dialog.getByLabel('Who').click();
    await page.getByRole('option', { name: who }).click();
    if (member) await dialog.getByLabel(member).check();
    await dialog.getByRole('button', { name: 'Create' }).click();
    await expect(dialog.getByText(name)).toBeVisible();
}

(async () => {
    const browser = await chromium.launch();
    const [mei, tom, ana] = await Promise.all([newUser(browser), newUser(browser), newUser(browser)]);
    await signUp(mei, 'mei');
    await signUp(tom, 'tom');
    await signUp(ana, 'ana');

    // the feed
    await post(tom, 'Reading the Nostr NIPs tonight. Signed events everywhere: nobody can edit what you wrote.');
    await post(ana, 'First week on WeJure. Following a few people and finding my way around.');
    await post(mei, 'Hello from WeJure! Who is coming to the Clojure meetup on Friday?');
    await follow(mei, 'tom');
    await follow(mei, 'ana');
    await mei.goto('/home');
    await expect(mei.getByText('Reading the Nostr NIPs')).toBeVisible();
    await mei.waitForTimeout(1000);
    await mei.screenshot({ path: path.join(OUT, 'feed.png') });

    // the Communities page
    await mei.goto('/communities');
    await mei.getByLabel('Name').fill('Clojure Study Group');
    await mei.getByRole('button', { name: 'Create' }).click();
    await expect(mei).toHaveURL(/\/c\//, { timeout: 30000 });
    await expect(mei.getByText('# general')).toBeVisible();
    await mei.goto('/communities');
    await expect(mei.getByText('Clojure Study Group')).toBeVisible();
    await mei.waitForTimeout(500);
    await mei.screenshot({ path: path.join(OUT, 'communities.png') });

    // a community with three channels and two topics
    await mei.getByRole('link', { name: 'Clojure Study Group' }).click();
    await expect(mei.getByText('# general')).toBeVisible();
    await mei.getByRole('button', { name: 'Settings' }).click();
    const dialog = mei.getByRole('dialog');
    for (const name of ['tom', 'ana']) {
        await dialog.getByLabel('Add by username').fill(name);
        await dialog.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(dialog.locator('.MuiDialogContent-root > div').filter({ hasText: name })).toBeVisible();
    }
    await createChannel(mei, dialog, 'organizers', 'chosen members', 'tom');
    await createChannel(mei, dialog, 'papers', 'everyone');
    await dialog.getByRole('button').first().click();                  // close
    await expect(mei.getByText('# papers')).toBeVisible();

    await mei.getByRole('button', { name: '# general' }).click();
    await say(mei, 'Welcome! Introduce yourselves here.', 'introductions');
    await acceptInvitation(tom, 'Clojure Study Group');
    await acceptInvitation(ana, 'Clojure Study Group');
    await tom.getByRole('button', { name: /introductions/ }).click();
    await say(tom, 'Hi, I am Tom. I mostly write ClojureScript.');
    await ana.getByRole('button', { name: /introductions/ }).click();
    await say(ana, 'Ana here, new to Clojure and keen to learn.');
    await ana.getByRole('button', { name: 'All topics' }).click();
    await say(ana, 'Could we meet on Friday at 6?', 'meeting times');
    await tom.getByRole('button', { name: 'All topics' }).click();
    await tom.getByRole('button', { name: /meeting times/ }).click();
    await say(tom, 'Friday works for me.');
    await mei.getByRole('button', { name: /meeting times/ }).click();
    await say(mei, 'Friday at 6 it is. I will book a room.');
    await mei.getByRole('button', { name: 'All topics' }).click();
    await expect(mei.getByText('Friday at 6 it is')).toBeVisible();
    await mei.waitForTimeout(1000);
    await mei.screenshot({ path: path.join(OUT, 'community.png') });

    await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
