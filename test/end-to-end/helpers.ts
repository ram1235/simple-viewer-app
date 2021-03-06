/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/

import * as Puppeteer from "puppeteer";

/** Wait for the specified text to appear on the page */
export async function waitForText(page: Puppeteer.Page, text: string, options?: Puppeteer.WaitForSelectorOptions) {
  await page.waitForXPath(`//text()[contains(., '${text}')]`, { visible: true, ...options});
}

/** Find an element in the DOM by specified text */
export async function findByText(element: Puppeteer.Page | Puppeteer.ElementHandle, text: string) {
  const elements = await element.$x(`//text()[contains(., '${text}')]/..`);

  if (elements.length)
    return elements[0];

  throw Error(`Element "${text}" not found!`);
}

/** Sign in to the main page using test credentials */
export async function signIn(page: Puppeteer.Page) {
  await page.waitForSelector(".signin-button");
  await page.click(".signin-button");

  await fillInSignin(page);
}

/** Fill in sign in form with test credentials and submit */
export async function fillInSignin(page: Puppeteer.Page) {
  await page.waitForSelector("#submitLogon");

  await page.type("#EmailAddress", "Regular.IModelJsTestUser@mailinator.com");
  await page.type("#Password", "Regular@iMJs");

  await page.click("#submitLogon");
}
